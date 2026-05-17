from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
import uuid
import logging

from app.services.extractor import DocumentExtractor
from app.services.storage import StorageService
from app.services.orchestrator import AIOrchestrator
from app.core.security import verify_token

# Import firestore to save the final analysis report
try:
    from firebase_admin import firestore
    FIREBASE_READY = True
except ImportError:
    FIREBASE_READY = False

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["upload"])

class TextUploadRequest(BaseModel):
    text: str
    title: Optional[str] = "Pasted Contract"

def _save_to_firestore(analysis_id: str, report: dict, user_id: str):
    """Saves the final report to Firestore so the frontend can retrieve it."""
    if FIREBASE_READY:
        try:
            db = firestore.client()
            # Attach user ID for security mapping
            report["user_id"] = user_id
            db.collection("analyses").document(analysis_id).set(report)
            logger.info(f"Saved analysis {analysis_id} to Firestore for user {user_id}.")
        except Exception as e:
            logger.error(f"Failed to save to Firestore: {e}")
    else:
        logger.warning("Firestore not initialized. Skipping database save.")

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    current_user: dict = Depends(verify_token)
):
    """Handles PDF and DOCX uploads and runs full AI analysis."""
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")
    
    file_bytes = await file.read()
    analysis_id = uuid.uuid4().hex
    user_id = current_user.get("uid", "anonymous_user")
    
    # 1. Upload to Storage
    storage_uri = StorageService.upload_file(file_bytes, file.filename, file.content_type)
    
    # 2. Extract Text
    try:
        extracted_text = DocumentExtractor.extract_text(file_bytes, file.filename, file.content_type)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
        
    # 3. Run Multi-Agent Analysis
    orchestrator = AIOrchestrator()
    try:
        report = orchestrator.analyze_document(extracted_text, analysis_id, file.filename)
        report["storage_uri"] = storage_uri
        
        # 4. Save to Database
        _save_to_firestore(analysis_id, report, user_id)
        
    except Exception as e:
        logger.error(f"AI Analysis failed: {e}")
        raise HTTPException(status_code=500, detail=f"AI Pipeline failed: {str(e)}")
        
    return {"status": "success", "analysis_id": analysis_id}

@router.post("/upload-text")
async def upload_pasted_text(
    request: TextUploadRequest,
    current_user: dict = Depends(verify_token)
):
    """Handles raw pasted text and runs full AI analysis."""
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
        
    analysis_id = uuid.uuid4().hex
    file_bytes = request.text.encode('utf-8')
    filename = f"{request.title.replace(' ', '_')}.txt"
    
    # 1. Upload to Storage
    storage_uri = StorageService.upload_file(file_bytes, filename, "text/plain")
    
    user_id = current_user.get("uid", "anonymous_user")
    
    # 2. Run Multi-Agent Analysis
    orchestrator = AIOrchestrator()
    try:
        report = orchestrator.analyze_document(request.text, analysis_id, filename)
        report["storage_uri"] = storage_uri
        
        # 3. Save to Database
        _save_to_firestore(analysis_id, report, user_id)
        
    except Exception as e:
        logger.error(f"AI Analysis failed: {e}")
        raise HTTPException(status_code=500, detail=f"AI Pipeline failed: {str(e)}")
    
    return {"status": "success", "analysis_id": analysis_id}

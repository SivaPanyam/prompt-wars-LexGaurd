from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import logging

import firebase_admin
from firebase_admin import auth

def is_firebase_ready():
    """Checks if Firebase Admin SDK is properly initialized and has apps."""
    return len(firebase_admin._apps) > 0

logger = logging.getLogger(__name__)

security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """Verifies a Firebase JWT token and returns the decoded token."""
    # Check if Firebase is actually initialized with valid credentials
    if not is_firebase_ready():
        logger.warning("Firebase Admin not fully initialized (missing credentials). Bypassing security check for local development.")
        return {"uid": "dev_user_123", "email": "dev@lexguard.com", "name": "Dev User"}

    token = credentials.credentials
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        # If we are in local dev, we might want to bypass even on token errors (e.g. expired)
        # but for now let's just log the detailed error.
        logger.error(f"Token verification failed: {e}")
        
        # Check if this is a credential error that should be bypassed in dev
        if "default credentials" in str(e).lower() or "not found" in str(e).lower():
            logger.warning("Default credentials not found during verification. Bypassing for local dev.")
            return {"uid": "dev_user_123", "email": "dev@lexguard.com", "name": "Dev User"}

        # Log more detail about the error to help debug
        if "expired" in str(e).lower():
            detail = "Authentication token has expired"
        elif "invalid-project-id" in str(e).lower():
            detail = "Token project ID mismatch. Check your Firebase config."
        else:
            detail = f"Invalid authentication credentials: {str(e)}"
            
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            headers={"WWW-Authenticate": "Bearer"},
        )

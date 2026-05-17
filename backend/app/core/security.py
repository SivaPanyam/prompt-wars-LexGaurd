from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import logging

try:
    from firebase_admin import auth
    FIREBASE_READY = True
except ImportError:
    FIREBASE_READY = False

logger = logging.getLogger(__name__)

security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """Verifies a Firebase JWT token and returns the decoded token."""
    if not FIREBASE_READY:
        # If Firebase is not initialized, we bypass security for local dev without credentials
        logger.warning("Firebase Auth not initialized. Bypassing security check.")
        return {"uid": "anonymous_user", "email": "test@example.com"}

    token = credentials.credentials
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        logger.error(f"Token verification failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

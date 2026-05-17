import os
import uuid
import tempfile
import logging
from firebase_admin import storage, credentials, initialize_app

logger = logging.getLogger(__name__)

# Attempt to initialize Firebase Admin
try:
    # If no default app, try to initialize it. If credentials are not set in environment,
    # it might fail or fall back to default compute engine credentials.
    import firebase_admin
    if not firebase_admin._apps:
        try:
            # Get config from environment
            bucket_name = os.environ.get("FIREBASE_STORAGE_BUCKET", "lexgaurd-161bb.firebasestorage.app")
            project_id = os.environ.get("GOOGLE_CLOUD_PROJECT", "lexgaurd-161bb")
            
            # Initialize with explicit project ID
            initialize_app(options={
                'storageBucket': bucket_name,
                'projectId': project_id
            })
            logger.info(f"Firebase Admin initialized for project: {project_id}")
            FIREBASE_READY = True
        except Exception as e:
            logger.warning(f"Firebase Admin SDK could not initialize with credentials: {e}")
            # We don't raise here, so the app starts in 'Dev Mode'
            FIREBASE_READY = False
    else:
        FIREBASE_READY = True
except Exception as e:
    logger.warning(f"Firebase Admin module error: {e}")
    FIREBASE_READY = False

class StorageService:
    @staticmethod
    def upload_file(file_bytes: bytes, original_filename: str, content_type: str) -> str:
        """Uploads a file to Firebase Storage and returns the storage path/URL."""
        
        # Generate a unique filename
        ext = os.path.splitext(original_filename)[1]
        unique_filename = f"contracts/{uuid.uuid4().hex}{ext}"

        if FIREBASE_READY:
            try:
                bucket = storage.bucket()
                blob = bucket.blob(unique_filename)
                blob.upload_from_string(file_bytes, content_type=content_type)
                # Make public or keep private depending on security requirements.
                # Assuming private for contracts, we return the gs:// URI or path.
                return f"gs://{bucket.name}/{unique_filename}"
            except Exception as e:
                logger.error(f"Failed to upload to Firebase Storage: {e}")
                # Fallback to local
                return StorageService._local_fallback(file_bytes, unique_filename)
        else:
            return StorageService._local_fallback(file_bytes, unique_filename)

    @staticmethod
    def _local_fallback(file_bytes: bytes, filename: str) -> str:
        """Saves file to local tmp directory as a fallback."""
        tmp_dir = os.path.join(tempfile.gettempdir(), "lexguard_uploads")
        os.makedirs(tmp_dir, exist_ok=True)
        # Flatten path
        flat_name = filename.replace("/", "_")
        local_path = os.path.join(tmp_dir, flat_name)
        with open(local_path, "wb") as f:
            f.write(file_bytes)
        logger.info(f"Saved file locally to {local_path} as fallback.")
        return f"local://{local_path}"

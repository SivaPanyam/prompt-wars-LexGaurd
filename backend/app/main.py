from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import upload

app = FastAPI(
    title="LEXGUARD API",
    description="Backend API for LEXGUARD AI-powered contract intelligence",
    version="1.0.0"
)

# Configure CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)

@app.get("/")
def read_root():
    return {"status": "online", "service": "LEXGUARD Core API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

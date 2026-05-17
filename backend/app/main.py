from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse
import os
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

@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["Cross-Origin-Opener-Policy"] = "same-origin-allow-popups"
    # We leave COEP as default or unsafe-none to avoid blocking assets
    return response

app.include_router(upload.router)

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Determine static directory (located outside app folder: backend/static)
static_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "static")
os.makedirs(static_dir, exist_ok=True)
os.makedirs(os.path.join(static_dir, "assets"), exist_ok=True)

# Mount static assets
app.mount("/assets", StaticFiles(directory=os.path.join(static_dir, "assets")), name="assets")

# SPA catch-all router for React Router routing fallback
@app.get("/{catchall:path}", response_class=HTMLResponse)
async def serve_spa(catchall: str):
    # Exclude API endpoints from catch-all fallback to avoid infinite loops on invalid API calls
    if catchall.startswith("api") or catchall.startswith("health") or catchall.startswith("docs") or catchall.startswith("openapi"):
        return HTMLResponse(content="Not Found", status_code=404)
        
    index_file = os.path.join(static_dir, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    else:
        return HTMLResponse(
            content="""
            <html>
                <head><title>LexGuard Single Stack</title></head>
                <body style="font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #0d1117; color: #c9d1d9;">
                    <h1>🛡️ LexGuard Production Service is Online</h1>
                    <p style="color: #8b949e;">React frontend assets are not built yet. Run the master Dockerfile to build and package both layers.</p>
                </body>
            </html>
            """
        )


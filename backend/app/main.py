from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import auth
from app import posts

app = FastAPI(title="Simple Blog API", version="1.0.0")

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with prefixes
app.include_router(auth.router, prefix="/auth", tags=["authentication"])
app.include_router(posts.router, tags=["posts"])

@app.get("/")
async def root():
    return {"message": "Simple Blog API is running!"}
# Load .env
from dotenv import load_dotenv
load_dotenv()

# Imports: FastAPI server, CORS middleware, DB setup, and route modules (auth, notes & AI)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routes.auth_routes import router as auth_router
from .routes.notes_routes import router as notes_router
from .routes.ai_routes import router as ai_router
# Create tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app 
app = FastAPI(title="Notepad Backend API")

# Enable CORS for frontend React access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],   # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers 
app.include_router(auth_router)
app.include_router(notes_router)    
app.include_router(ai_router)


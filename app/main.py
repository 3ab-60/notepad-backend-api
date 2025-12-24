# Load environment variables from .env file
# This allows secure access to sensitive configurations like SECRET_KEY
from dotenv import load_dotenv
load_dotenv()

# Import FastAPI framework
from fastapi import FastAPI

# Import database base and engine to create tables
from .database import Base, engine

# Import authentication routes
from .routes.auth_routes import router as auth_router


# Create database tables based on SQLAlchemy models
# This runs once when the application starts
Base.metadata.create_all(bind=engine)


# Initialize FastAPI application instance
app = FastAPI(
    title="Notepad Backend API"
)


# Register authentication routes with the main application
# All routes defined in auth_routes will now be available
app.include_router(auth_router)

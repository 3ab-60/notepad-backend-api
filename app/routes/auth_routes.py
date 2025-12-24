# Import required FastAPI utilities
from fastapi import APIRouter, Depends, HTTPException
# Import SQLAlchemy session for database operations
from sqlalchemy.orm import Session
# Import database session factory
from ..database import SessionLocal
# Import User database model
from ..models import User
# Import request and response schemas
from ..schemas import UserCreate, Token
# Import authentication helper functions
from ..auth import hash_password, verify_password, create_access_token

# Create an API router for authentication-related endpoints
# All routes will be prefixed with /auth
router = APIRouter(prefix="/auth", tags=["Authentication"])

# Dependency function to get a database session
# Ensures that the session is properly closed after request processing
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------------- USER REGISTRATION ----------------------

# Endpoint to register a new user
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    # Check if a user with the same email already exists
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    # Create a new user with hashed password
    new_user = User(
        email=user.email,
        hashed_password=hash_password(user.password)
    )
    # Add user to database and commit transaction
    db.add(new_user)
    db.commit()
    return {"message": "User registered successfully"}


# ---------------------- USER LOGIN ----------------------

# Endpoint to authenticate user and generate JWT token
@router.post("/login", response_model=Token)
def login(user: UserCreate, db: Session = Depends(get_db)):
    # Retrieve user from database using email
    db_user = db.query(User).filter(User.email == user.email).first()
    # Retrieve user from database using email
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    # Generate JWT access token with email as subject
    token = create_access_token({"sub": db_user.email})
    # Return token in standard bearer format
    return {"access_token": token, "token_type": "bearer"}
from fastapi import Depends
from ..auth import get_current_user

# ---------------------- PROTECTED ROUTE ----------------------

# Endpoint accessible only to authenticated users
@router.get("/protected-test")
def protected_test(current_user = Depends(get_current_user)):
    # If token is valid, current_user is injected automatically
    return {
        "message": "You are authorized",
        "user_email": current_user.email
    }


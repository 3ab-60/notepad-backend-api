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
from ..auth import hash_password, verify_password, create_access_token, get_current_user

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

from pydantic import BaseModel

class RegisterInput(BaseModel):
    email: str
    password: str

@router.post("/register")
def register(user: RegisterInput, db: Session = Depends(get_db)):
    # Check if email already registered
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create new user with hashed password
    new_user = User(
        email=user.email,
        hashed_password=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # 🔥 Optional: auto-login user after registration
    token = create_access_token({"sub": new_user.email})

    return {
        "message": "User registered successfully",
        "access_token": token,         # <-- Frontend can store instantly
        "token_type": "bearer"
    }


# ---------------------- USER LOGIN ----------------------

from pydantic import BaseModel

class LoginInput(BaseModel):
    email: str
    password: str

@router.post("/login", response_model=Token)
def login(data: LoginInput, db: Session = Depends(get_db)):
    # Find user using email
    db_user = db.query(User).filter(User.email == data.email).first()

    if not db_user or not verify_password(data.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": db_user.email})

    return {"access_token": token, "token_type": "bearer"}


# ---------------------- PROTECTED ROUTE ----------------------

# Endpoint accessible only to authenticated users
@router.get("/protected-test")
def protected_test(current_user = Depends(get_current_user)):
    # If token is valid, current_user is injected automatically
    return {
        "message": "You are authorized",
        "user_email": current_user.email
    }


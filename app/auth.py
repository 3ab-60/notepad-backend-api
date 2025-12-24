# ---------------------- PASSWORD HASHING ----------------------

# Import CryptContext for secure password hashing
from passlib.context import CryptContext

# Configure password hashing using bcrypt algorithm
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# Hash a plain-text password before storing in database
def hash_password(password: str):
    return pwd_context.hash(password)

# Verify a plain-text password against a hashed password
def verify_password(password: str, hashed: str):
    return pwd_context.verify(password, hashed)


# ---------------------- JWT TOKEN CREATION ----------------------

# Import datetime utilities for token expiration handling
from datetime import datetime, timedelta

# Import JWT encoding utilities
from jose import jwt

# Secret key used to sign JWT tokens
SECRET_KEY = "supersecretkey"

# Algorithm used for JWT encoding and decoding
ALGORITHM = "HS256"

# Token validity duration (in minutes)
ACCESS_TOKEN_EXPIRE_MINUTES = 60


# Create a JWT access token with expiration time
def create_access_token(data: dict):
    # Copy input data to avoid modifying original dictionary
    to_encode = data.copy()

    # Set token expiration time
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    # Encode and return the JWT token
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# ---------------------- JWT TOKEN VALIDATION ----------------------

# Import FastAPI utilities for dependency injection and error handling
from fastapi import Depends, HTTPException, status

# Import OAuth2 scheme for extracting Bearer token from request header
from fastapi.security import OAuth2PasswordBearer

# Import JWT decoding error handling
from jose import JWTError

# Import SQLAlchemy session
from sqlalchemy.orm import Session

# Import database session dependency
from .database import get_db

# Import User model for database lookup
from .models import User


# OAuth2 scheme to read token from Authorization header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# Secret key and algorithm must match token creation settings
SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"


# Dependency function to retrieve the currently authenticated user
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    # Exception raised when authentication fails
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        # Decode JWT token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        # Extract user identifier (email) from token payload
        email: str | None = payload.get("sub")
        if email is None:
            raise credentials_exception

    except JWTError:
        # Raised if token is invalid or expired
        raise credentials_exception

    # Fetch user from database using extracted email
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception

    # Return authenticated user object
    return user

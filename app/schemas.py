# Import BaseModel from Pydantic for data validation
from pydantic import BaseModel


# Schema for user registration and login requests
# Defines the expected input data structure
class UserCreate(BaseModel):
    # User email address
    email: str

    # User password (will be hashed before storage)
    password: str


# Schema for authentication token response
# Defines the structure of the JWT token returned after login
class Token(BaseModel):
    # JWT access token string
    access_token: str

    # Token type (typically "bearer")
    token_type: str

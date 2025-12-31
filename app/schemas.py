# Import BaseModel from Pydantic for data validation
from pydantic import BaseModel

# Used to store timestamps and due dates for notes
from datetime import datetime

# Optional allows a field to be nullable or not required during creation
from typing import Optional


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

# Schema for creating a note
# This defines the format of incoming request data when a user creates or updates a note
class NoteCreate(BaseModel):
    title: str      # Title of the note
    content: str    # Main content/body of the note
    due_date: Optional[datetime] = None # Due date for calendar/task scheduling (optional)
    is_completed: Optional[bool] = False # Task status tracker (False=pending, True=completed).
# Schema for sending note details in responses
# Inherits fields from NoteCreate and adds 'id' for output formatting
class NoteOut(NoteCreate):
    id: int         # Note ID returned from the database
    is_completed: bool                   # Show status
    created_at: datetime                 # Show creation time

    # Enables compatibility with SQLAlchemy ORM objects
    # Allows returning database objects directly without manual conversion
    class Config:
        orm_mode = True

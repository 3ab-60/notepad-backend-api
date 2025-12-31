# Import required SQLAlchemy column types
from sqlalchemy import Column, Integer, String

# Import the Base class for ORM model inheritance
from .database import Base


# User model representing the 'users' table in the database
class User(Base):
    # Name of the database table
    __tablename__ = "users"

    # Unique identifier for each user (Primary Key)
    id = Column(Integer, primary_key=True, index=True)

    # User email address
    # 'unique=True' ensures no duplicate email registrations
    # 'index=True' improves query performance
    email = Column(String, unique=True, index=True)

    # Stores the hashed version of the user's password
    # Plain-text passwords are NEVER stored
    hashed_password = Column(String)
    
# Import required SQLAlchemy fields for table creation
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean

# Used to store timestamps and due dates for notes
from datetime import datetime

# Import Base class to register this model with the ORM
from .database import Base


# Database model for storing notes
# Each Note belongs to a specific user (owner)
class Note(Base):
    # Name of the table in the database
    __tablename__ = "notes"

    # Unique identifier for each note (Primary Key)
    id = Column(Integer, primary_key=True, index=True)

    # Title of the note (short summary)
    title = Column(String)

    # Main content/body of the note
    content = Column(String)

    # Foreign key linking note to the user who owns it
    # "users.id" means owner_id references id column in users table
    owner_id = Column(Integer, ForeignKey("users.id"))
    # For calendar feature
    due_date = Column(DateTime, nullable=True)          
     # For history & status tracking
    is_completed = Column(Boolean, default=False)       
    # Good for sorting/history
    created_at = Column(DateTime, default=datetime.utcnow)  

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

# Import SQLAlchemy utilities for database configuration
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


# Database connection URL
# Using SQLite for lightweight local development
DATABASE_URL = "sqlite:///./notepad.db"


# Create SQLAlchemy engine
# 'check_same_thread=False' allows SQLite to be used with FastAPI
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)


# Create a database session factory
# Each request will use a separate session
SessionLocal = sessionmaker(bind=engine)


# Base class for all ORM models
# All database models will inherit from this
Base = declarative_base()


# Dependency function to provide a database session
# Ensures proper session creation and cleanup per request
def get_db():
    db = SessionLocal()
    try:
        # Provide the database session to the request
        yield db
    finally:
        # Close the session after request completion
        db.close()

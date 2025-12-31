# Import required modules from FastAPI
from fastapi import APIRouter, Depends, HTTPException

# To interact with the database session
from sqlalchemy.orm import Session

# Import DB connection function
from ..database import get_db

# Import Note model (table)
from ..models import Note

# Import request/response schemas
from ..schemas import NoteCreate, NoteOut

# Import authentication dependency to protect routes
from ..auth import get_current_user


# Router for Notes APIs
# prefix="/notes" → all endpoints will start with /notes
# tags=["Notes"] → Display category on Swagger UI
router = APIRouter(prefix="/notes", tags=["Notes"])


# ---------------- Create Note ----------------
@router.post("/", response_model=NoteOut)
def create_note(note: NoteCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    """
    Creates a new note for the logged-in user.
    Requires authentication (JWT).
    """
    new_note = Note(title=note.title, content=note.content, due_date=note.due_date, owner_id=user.id)  # Bind note to user
    db.add(new_note)
    db.commit()
    db.refresh(new_note)  # Get saved data with id
    return new_note


# ---------------- Get All Notes for Logged-in User ----------------
@router.get("/", response_model=list[NoteOut])
def get_notes(db: Session = Depends(get_db), user=Depends(get_current_user)):
    """
    Fetch all notes belonging to the authenticated user.
    """
    return db.query(Note).filter(Note.owner_id == user.id).all()


# ---------------- Update Note ----------------
@router.put("/{note_id}", response_model=NoteOut)
def update_note(note_id: int, note: NoteCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    """
    Update a specific note only if it belongs to the logged-in user.
    """
    db_note = db.query(Note).filter(
        Note.id == note_id, Note.owner_id == user.id
    ).first()

    # If note doesn't exist or isn't user's note → error
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")

    # Update fields
    db_note.title = note.title
    db_note.content = note.content
    db_note.due_date = note.due_date             
    db_note.is_completed = note.is_completed      
    db.commit()
    db.refresh(db_note)
    return db_note


# ---------------- Delete Note ----------------
@router.delete("/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    """
    Delete a user's note by ID.
    Only the owner can delete it.
    """
    db_note = db.query(Note).filter(
        Note.id == note_id, Note.owner_id == user.id
    ).first()

    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")

    db.delete(db_note)
    db.commit()
    return {"message": "Note deleted successfully"}

# ------------------- History & Calendar Endpoints -------------------

# 1️⃣ Get all completed tasks
@router.get("/completed", response_model=list[NoteOut])
def completed_tasks(db: Session = Depends(get_db), user=Depends(get_current_user)):
    """
    Returns list of completed tasks belonging to the logged-in user.
    Helps in viewing task history (marked as done).
    """
    return db.query(Note).filter(Note.owner_id == user.id, Note.is_completed == True).all()


# 2️⃣ Get all pending tasks
@router.get("/pending", response_model=list[NoteOut])
def pending_tasks(db: Session = Depends(get_db), user=Depends(get_current_user)):
    """
    Returns only pending tasks (not completed yet).
    Useful for users to track what's left.
    """
    return db.query(Note).filter(Note.owner_id == user.id, Note.is_completed == False).all()





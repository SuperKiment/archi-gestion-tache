from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.database import get_db
from api.schemas.journal import JournalCreate, JournalRead
from api.crud import journal_crud

router = APIRouter(prefix="/journaux", tags=["Journaux"])

@router.post("/", response_model=JournalRead)
def create_journal_route(data: JournalCreate, db: Session = Depends(get_db)):
    return journal_crud.create_journal(db, data)

@router.get("/", response_model=list[JournalRead])
def list_journaux_route(db: Session = Depends(get_db)):
    return journal_crud.get_all_journaux(db)

@router.get("/{id_journal}", response_model=JournalRead)
def get_journal_route(id_journal: int, db: Session = Depends(get_db)):
    return journal_crud.get_journal_by_id(db, id_journal)

@router.delete("/{id_journal}")
def delete_journal_route(id_journal: int, db: Session = Depends(get_db)):
    journal = journal_crud.get_journal_by_id(db, id_journal)
    journal_crud.delete_journal(db, journal)
    return {"message": "Journal supprimé"}

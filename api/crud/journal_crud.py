from sqlalchemy.orm import Session
from api.models.journal import Journal
from api.schemas.journal import JournalCreate
from datetime import datetime
from fastapi import HTTPException
import logging
from api.utils.utils import retry_db_operation
logger = logging.getLogger(__name__)

@retry_db_operation(max_retries=3, delay=2)
def create_journal(db: Session, data: JournalCreate):
    journal = Journal(
        type=data.type,
        idUtilisateur=data.idUtilisateur,
        message=data.message,
        date_=datetime.utcnow()
    )
    db.add(journal)
    db.commit()
    db.refresh(journal)
    return journal

@retry_db_operation(max_retries=3, delay=2)
def get_all_journaux(db: Session):
    return db.query(Journal).all()

@retry_db_operation(max_retries=3, delay=2)
def get_journal_by_id(db: Session, id_journal: int):
    journal = db.query(Journal).filter(Journal.idJournal == id_journal).first()
    if not journal:
        raise HTTPException(status_code=404, detail="Journal non trouvé")
    return journal

@retry_db_operation(max_retries=3, delay=2)
def delete_journal(db: Session, journal: Journal):
    db.delete(journal)
    db.commit()
    return {"message": "Journal supprimé"}


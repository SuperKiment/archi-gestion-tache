from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class JournalCreate(BaseModel):
    type: Optional[str] = None
    idUtilisateur: int
    message: Optional[str] = None

class JournalRead(JournalCreate):
    idJournal: int
    date_: datetime

    class Config:
        from_attributes = True

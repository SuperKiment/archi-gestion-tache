from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TacheCreate(BaseModel):
    titre: str
    description: str
    prix: float
    remarque: Optional[str] = None
    dateEcheance: Optional[datetime] = None
    priorite: Optional[int] = None
    idType: int

class TacheRead(TacheCreate):
    idTache: int
    dateCreation: datetime
    idGestionnaire: Optional[int]

    class Config:
        from_attributes = True 

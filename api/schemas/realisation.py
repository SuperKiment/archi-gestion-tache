from pydantic import BaseModel
from datetime import datetime

class RealisationCreate(BaseModel):
    dateDebutRealisation: datetime
    dateFinRealisation: datetime | None = None
    idPartenaire: int
    idTache: int

class RealisationResponse(RealisationCreate):
    idRealisation: int

    class Config:
        from_attributes = True
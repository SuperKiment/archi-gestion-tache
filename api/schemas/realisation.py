from pydantic import BaseModel
from datetime import datetime

class RealisationCreate(BaseModel):
    dateDebutRealisation: datetime
    dateFinRealisation: datetime | None = None
    idPartenaire: int
    idTache: int

class RealisationUpdate(BaseModel):
    dateDebutRealisation: datetime | None = None
    dateFinRealisation: datetime | None = None
    idPartenaire: int | None = None

class RealisationResponse(RealisationCreate):
    idRealisation: int

    class Config:
        from_attributes = True
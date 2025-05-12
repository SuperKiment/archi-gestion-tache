from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.schemas.realisation import RealisationCreate, RealisationResponse
from api.crud import realisation_crud
from api.database import get_db

router = APIRouter(prefix="/realisation", tags=["Realisation"])

@router.post("/", response_model=RealisationResponse)
def create_realisation_route(data: RealisationCreate, db: Session = Depends(get_db)):
    return realisation_crud.create_realisation(db, data)

@router.get("/", response_model=list[RealisationResponse])
def get_all_realisation_route(db: Session = Depends(get_db)):
    return realisation_crud.get_all_realisation(db)

@router.get("/{id_realisation}", response_model=RealisationResponse)
def get_realisation_by_id_route(id_realisation: int, db: Session = Depends(get_db)):
    return realisation_crud.get_realisation_by_id(db, id_realisation)
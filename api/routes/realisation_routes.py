from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.schemas.realisation import RealisationCreate, RealisationResponse, RealisationUpdate
from api.crud import realisation_crud
from api.utils.auth import verify_token

from api.database import get_db

router = APIRouter(prefix="/realisation", tags=["Realisation"], dependencies=[Depends(verify_token)])

@router.post("/", response_model=RealisationResponse)
def create_realisation_route(data: RealisationCreate, db: Session = Depends(get_db)):
    return realisation_crud.create_realisation(db, data)

@router.get("/", response_model=list[RealisationResponse])
def get_all_realisation_route(db: Session = Depends(get_db)):
    return realisation_crud.get_all_realisation(db)

@router.get("/{id_realisation}", response_model=RealisationResponse)
def get_realisation_by_id_route(id_realisation: int, db: Session = Depends(get_db)):
    return realisation_crud.get_realisation_by_id(db, id_realisation)

@router.get("/tache/{id_tache}", response_model=RealisationResponse)
def get_realisation_by_tache_id_route(id_tache: int, db: Session = Depends(get_db)):
    try:
        return realisation_crud.get_realisation_by_tache_id(db, id_tache)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.put("/{id_realisation}", response_model=RealisationResponse)
def update_realisation_route(id_realisation: int, data: RealisationUpdate, db: Session = Depends(get_db)):
    try:
        return realisation_crud.update_realisation(db, id_realisation, data)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.delete("/{id_realisation}")
def delete_realisation_route(id_realisation: int, db: Session = Depends(get_db)):
    try:
        realisation_crud.delete_realisation(db, id_realisation)
        return {"message": "Réalisation supprimée"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.database import get_db
from api.schemas.tache import TacheCreate, TacheRead
from api.crud import tache_crud

router = APIRouter(prefix="/taches", tags=["Taches"])

@router.post("/", response_model=TacheRead)
def create_tache_route(tache_data: TacheCreate, id_gestionnaire: int, db: Session = Depends(get_db)):
    return tache_crud.create_tache(db, tache_data, id_gestionnaire)

@router.get("/", response_model=list[TacheRead])
def list_taches_route(db: Session = Depends(get_db)):
    return tache_crud.get_all_taches(db)

@router.get("/{id_tache}", response_model=TacheRead)
def get_tache_route(id_tache: int, db: Session = Depends(get_db)):
    return tache_crud.get_tache_by_id(db, id_tache)

@router.put("/{id_tache}", response_model=TacheRead)
def update_tache_route(id_tache: int, data: TacheCreate, db: Session = Depends(get_db)):
    tache = tache_crud.get_tache_by_id(db, id_tache)
    return tache_crud.update_tache(db, tache, data.dict())

@router.delete("/{id_tache}")
def delete_tache_route(id_tache: int, db: Session = Depends(get_db)):
    tache = tache_crud.get_tache_by_id(db, id_tache)
    return tache_crud.delete_tache(db, tache)

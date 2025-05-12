from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.schemas.type import TypeCreate, TypeResponse
from api.crud import type_crud
from api.database import get_db

router = APIRouter(prefix="/types", tags=["Types"])

@router.post("/", response_model=TypeResponse)
def create_type_route(data: TypeCreate, db: Session = Depends(get_db)):
    return type_crud.create_type(db, data)

@router.get("/", response_model=list[TypeResponse])
def get_all_types_route(db: Session = Depends(get_db)):
    return type_crud.get_all_types(db)

@router.get("/{id_type}", response_model=TypeResponse)
def get_type_by_id_route(id_type: int, db: Session = Depends(get_db)):
    return type_crud.get_type_by_id(db, id_type)

@router.put("/{id_type}", response_model=TypeResponse)
def update_type_route(id_type: int, data: TypeCreate, db: Session = Depends(get_db)):
    type_obj = type_crud.get_type_by_id(db, id_type)
    return type_crud.update_type(db, type_obj, data)

@router.delete("/{id_type}")
def delete_type_route(id_type: int, db: Session = Depends(get_db)):
    type_obj = type_crud.get_type_by_id(db, id_type)
    type_crud.delete_type(db, type_obj)
    return {"message": "Type supprimé"}

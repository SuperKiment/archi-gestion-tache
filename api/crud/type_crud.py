from sqlalchemy.orm import Session
from api.models.type import Type
from api.schemas.type import TypeCreate
from fastapi import HTTPException
import logging
from api.utils.utils import retry_db_operation
logger = logging.getLogger(__name__)

@retry_db_operation(max_retries=3, delay=2)
def create_type(db: Session, data: TypeCreate):
    new_type = Type(titre=data.titre)
    db.add(new_type)
    db.commit()
    db.refresh(new_type)
    return new_type

@retry_db_operation(max_retries=3, delay=2)
def get_all_types(db: Session):
    return db.query(Type).all()

@retry_db_operation(max_retries=3, delay=2)
def get_type_by_id(db: Session, id_type: int):
    type_obj = db.query(Type).filter(Type.idType == id_type).first()
    if not type_obj:
        raise HTTPException(status_code=404, detail="Type not found")
    return type_obj

@retry_db_operation(max_retries=3, delay=2)
def update_type(db: Session, type_obj: Type, data: TypeCreate):
    type_obj.titre = data.titre
    db.commit()
    db.refresh(type_obj)
    return type_obj

@retry_db_operation(max_retries=3, delay=2)
def delete_type(db: Session, type_obj: Type):
    if not type_obj:
        raise HTTPException(status_code=404, detail="Type not found")
    
    db.delete(type_obj)
    db.commit()
    return {"message": "Type supprimé"}

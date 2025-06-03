from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.database import get_db
from api.schemas.tache import TacheCreate, TacheRead
from api.crud import tache_crud
from api.utils.auth import verify_token
import logging
import json

# Configuration du logger avec le bon namespace
logger = logging.getLogger('api.routes.tache')

router = APIRouter(prefix="/taches", tags=["Taches"], dependencies=[Depends(verify_token)])

@router.post("/", response_model=TacheRead)
def create_tache_route(tache_data: TacheCreate, id_gestionnaire: int, db: Session = Depends(get_db)):
    return tache_crud.create_tache(db, tache_data, id_gestionnaire)

@router.get("/", response_model=list[TacheRead])
def list_taches_route(db: Session = Depends(get_db)):
    return tache_crud.get_all_taches(db)

@router.get("/{id_tache}", response_model=TacheRead)
def get_tache_route(id_tache: int, db: Session = Depends(get_db)):
    try:
        return tache_crud.get_tache_by_id(db, id_tache)
    except HTTPException as e:
        # Simplement relancer l'exception HTTPException
        raise e
    except Exception as e:
        # Gérer toutes les autres exceptions
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération de la tâche: {str(e)}")

@router.put("/{id_tache}", response_model=TacheRead)
def update_tache_route(id_tache: int, data: TacheCreate, db: Session = Depends(get_db)):
    try:
        # Vérifier si la tâche existe
        tache = tache_crud.get_tache_by_id(db, id_tache)
        if not tache:
            raise HTTPException(
                status_code=404,
                detail=f"Tâche avec l'ID {id_tache} non trouvée"
            )

        # Vérifier les données requises
        validation_errors = []
        if not data.titre:
            validation_errors.append("Le titre est requis")
        if not data.description:
            validation_errors.append("La description est requise")
        if not data.prix:
            validation_errors.append("Le prix est requis")
        if not data.idType:
            validation_errors.append("Le type de tâche est requis")

        if validation_errors:
            error_message = "Champs manquants ou invalides : " + ", ".join(validation_errors)
            print(f"Erreur de validation : {error_message}")
            print(f"Données reçues : {data.dict()}")
            raise HTTPException(
                status_code=422,
                detail=error_message
            )

        # Convertir les données en dict et mettre à jour
        try:
            return tache_crud.update_tache(db, tache, data.dict())
        except ValueError as ve:
            print(f"Erreur de validation : {str(ve)}")
            raise HTTPException(
                status_code=422,
                detail=str(ve)
            )
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Erreur inattendue : {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Erreur lors de la mise à jour de la tâche: {str(e)}"
        )

@router.delete("/{id_tache}")
def delete_tache_route(id_tache: int, db: Session = Depends(get_db)):
    try:
        tache = tache_crud.get_tache_by_id(db, id_tache)
        return tache_crud.delete_tache(db, tache)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la suppression de la tâche: {str(e)}")

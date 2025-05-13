from sqlalchemy.orm import Session
from datetime import datetime
from api.models.tache import Tache
from api.schemas.tache import TacheCreate
from fastapi import HTTPException
import logging
from api.utils import retry_db_operation

logger = logging.getLogger(__name__)

@retry_db_operation(max_retries=3, delay=2)
def create_tache(db: Session, data: TacheCreate, id_gestionnaire: int):
    try:
        tache = Tache(
            titre=data.titre,
            description=data.description,
            prix=data.prix,
            remarque=data.remarque,
            dateCreation=datetime.utcnow(),
            dateEcheance=data.dateEcheance if data.dateEcheance else None,
            priorite=data.priorite,
            idGestionnaire=id_gestionnaire,
            idType=data.idType
        )
        db.add(tache)
        db.commit()
        db.refresh(tache)
        return tache
    except Exception as e:
        db.rollback()
        logger.error(f"Erreur lors de la création de la tâche: {e}")
        raise ValueError(f"Erreur lors de la création de la tâche: {str(e)}")

@retry_db_operation(max_retries=3, delay=2)
def get_all_taches(db: Session):
    return db.query(Tache).all()

@retry_db_operation(max_retries=3, delay=2)
def get_tache_by_id(db: Session, id_tache: int):
    try:
        tache = db.query(Tache).filter(Tache.idTache == id_tache).first()
        if not tache:
            raise ValueError(f"Tâche avec ID {id_tache} non trouvée")
        return tache
    except Exception as e:
        logger.error(f"Erreur lors de la récupération de la tâche {id_tache}: {e}")
        if "non trouvée" in str(e):
            raise ValueError(str(e))
        else:
            raise ValueError(f"Erreur lors de la récupération de la tâche: {str(e)}")

@retry_db_operation(max_retries=3, delay=2)
def update_tache(db: Session, tache: Tache, data: dict):
    try:
        for key, value in data.items():
            if hasattr(tache, key):
                setattr(tache, key, value)
        db.commit()
        db.refresh(tache)
        return tache
    except Exception as e:
        db.rollback()
        logger.error(f"Erreur lors de la mise à jour de la tâche {tache.idTache}: {e}")
        raise ValueError(f"Erreur lors de la mise à jour de la tâche: {str(e)}")

@retry_db_operation(max_retries=3, delay=2)
def delete_tache(db: Session, tache: Tache):
    try:
        db.delete(tache)
        db.commit()
        return {"message": "Tâche supprimée"}
    except Exception as e:
        db.rollback()
        logger.error(f"Erreur lors de la suppression de la tâche {tache.idTache}: {e}")
        raise ValueError(f"Erreur lors de la suppression de la tâche: {str(e)}")
from sqlalchemy.orm import Session
from datetime import datetime
from api.models.tache import Tache
from api.schemas.tache import TacheCreate
from fastapi import HTTPException
import logging
from api.utils.utils import retry_db_operation
from sqlalchemy.exc import SQLAlchemyError

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
        # Vérifier les types de données
        if 'prix' in data and not isinstance(data['prix'], (int, float)):
            raise ValueError("Le prix doit être un nombre")
        
        if 'priorite' in data and not isinstance(data['priorite'], int):
            raise ValueError("La priorité doit être un nombre entier")
        
        # Gestion de la date d'échéance
        if 'dateEcheance' in data:
            if data['dateEcheance']:
                try:
                    # Si c'est une chaîne de caractères, on la convertit en datetime
                    if isinstance(data['dateEcheance'], str):
                        data['dateEcheance'] = datetime.fromisoformat(data['dateEcheance'].replace('Z', '+00:00'))
                    # Si c'est déjà un datetime, on le laisse tel quel
                    elif not isinstance(data['dateEcheance'], datetime):
                        raise ValueError("Format de date invalide pour dateEcheance")
                except ValueError as e:
                    raise ValueError(f"Format de date invalide pour dateEcheance: {str(e)}")
            else:
                data['dateEcheance'] = None

        # Mettre à jour les attributs
        for key, value in data.items():
            if hasattr(tache, key):
                setattr(tache, key, value)
            else:
                logger.warning(f"Attribut inconnu ignoré: {key}")

        try:
            db.commit()
            db.refresh(tache)
            return tache
        except SQLAlchemyError as e:
            db.rollback()
            logger.error(f"Erreur SQL lors de la mise à jour de la tâche {tache.idTache}: {e}")
            raise ValueError(f"Erreur de base de données: {str(e)}")
    except ValueError as e:
        db.rollback()
        raise e
    except Exception as e:
        db.rollback()
        logger.error(f"Erreur inattendue lors de la mise à jour de la tâche {tache.idTache}: {e}")
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
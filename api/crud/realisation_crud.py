from sqlalchemy.orm import Session
from api.models.realisation import Realisation
from api.schemas.realisation import RealisationCreate, RealisationUpdate
from sqlalchemy.exc import IntegrityError
import logging
from api.utils import retry_db_operation

logger = logging.getLogger(__name__)

@retry_db_operation(max_retries=3, delay=2)
def create_realisation(db: Session, realisation_data: RealisationCreate):
    try:
        new_realisation = Realisation(
            dateDebutRealisation=realisation_data.dateDebutRealisation,
            dateFinRealisation=realisation_data.dateFinRealisation,
            idPartenaire=realisation_data.idPartenaire,
            idTache=realisation_data.idTache
        )
        db.add(new_realisation)
        db.commit()
        db.refresh(new_realisation)
        return new_realisation
    except IntegrityError:
        db.rollback()
        raise ValueError("La tâche avec cet ID n'existe pas ou il y a un conflit.")

@retry_db_operation(max_retries=3, delay=2)
def get_all_realisation(db: Session):
    return db.query(Realisation).all()

@retry_db_operation(max_retries=3, delay=2)
def get_realisation_by_id(db: Session, id_realisation: int):
    realisation = db.query(Realisation).filter(Realisation.idRealisation == id_realisation).first()
    if realisation is None:
        raise ValueError(f"Realisation avec ID {id_realisation} introuvable.")
    return realisation

@retry_db_operation(max_retries=3, delay=2)
def get_realisation_by_tache_id(db: Session, id_tache: int):
    realisation = db.query(Realisation).filter(Realisation.idTache == id_tache).first()
    if realisation is None:
        raise ValueError(f"Aucune réalisation trouvée pour la tâche avec ID {id_tache}.")
    return realisation

@retry_db_operation(max_retries=3, delay=2)
def update_realisation(db: Session, id_realisation: int, realisation_data: RealisationUpdate):
    realisation = get_realisation_by_id(db, id_realisation)
    
    # Mettre à jour uniquement les champs fournis
    if realisation_data.dateDebutRealisation is not None:
        realisation.dateDebutRealisation = realisation_data.dateDebutRealisation
    if realisation_data.dateFinRealisation is not None:
        realisation.dateFinRealisation = realisation_data.dateFinRealisation
    if realisation_data.idPartenaire is not None:
        realisation.idPartenaire = realisation_data.idPartenaire
    
    db.commit()
    db.refresh(realisation)
    return realisation

@retry_db_operation(max_retries=3, delay=2)
def delete_realisation(db: Session, id_realisation: int):
    realisation = get_realisation_by_id(db, id_realisation)
    db.delete(realisation)
    db.commit()
    return True

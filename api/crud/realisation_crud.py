from sqlalchemy.orm import Session
from api.models.realisation import Realisation
from api.schemas.realisation import RealisationCreate
from sqlalchemy.exc import IntegrityError
import logging
from api.utils.utils import retry_db_operation

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

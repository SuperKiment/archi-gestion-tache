from sqlalchemy import Column, Integer, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from api.database import Base
from api.models.tache import Tache 

class Realisation(Base):
    __tablename__ = 'realisation'

    idRealisation = Column("idrealisation", Integer, primary_key=True, autoincrement=True)
    dateDebutRealisation = Column("datedebutrealisation", TIMESTAMP, nullable=False)
    dateFinRealisation = Column("datefinrealisation", TIMESTAMP, nullable=True)
    idPartenaire = Column("idpartenaire", Integer, nullable=False)
    idTache = Column("idtache", ForeignKey('tache.idtache', ondelete='CASCADE'), unique=True, nullable=False)

    tache = relationship("Tache", back_populates="realisations")



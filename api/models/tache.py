from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric
from api.database import Base
from sqlalchemy.orm import relationship

class Tache(Base):
    __tablename__ = 'tache'
    idTache = Column("idtache", Integer, primary_key=True)
    titre = Column("titre", String(255), nullable=False)
    description = Column("description", String(255), nullable=False)
    prix = Column("prix", Numeric(10, 2), nullable=False)
    remarque = Column("remarque", String(50))
    dateCreation = Column("datecreation", DateTime, nullable=False)
    dateEcheance = Column("dateecheance", DateTime)
    priorite = Column("priorite", Integer)
    idGestionnaire = Column("idgestionnaire", Integer)
    idType = Column("idtype", ForeignKey('type.idtype'), nullable=False)

    type = relationship("Type", back_populates="taches")
    
    realisations = relationship(
        "Realisation",  
        back_populates="tache" 
    )
    
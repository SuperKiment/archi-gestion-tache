from sqlalchemy import Column, Integer, String
from api.database import Base
from sqlalchemy.orm import relationship
from api.models.tache import Tache

class Type(Base):
    __tablename__ = 'type'
    idType = Column("idtype", Integer, primary_key=True)
    titre = Column("titre", String(255), nullable=False)

    taches = relationship("Tache", back_populates="type")

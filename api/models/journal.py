from sqlalchemy import Column, Integer, Date, ForeignKey, DateTime, String, Text
from api.database import Base

class Journal(Base):
    __tablename__ = 'journal'
    idJournal = Column("idjournal", Integer, primary_key=True)
    date_ = Column("date_", DateTime, nullable=False)
    type = Column("type", String(255))
    idUtilisateur = Column("idutilisateur", Integer, nullable=False)
    message = Column("message", Text)
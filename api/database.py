from sqlalchemy import create_engine, event, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from api.config import settings
import time
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

engine_args = {
    "pool_pre_ping": True,
    "pool_recycle": 300,
    "pool_timeout": 30,
    "max_overflow": 10,
    "pool_size": 5
}

engine = create_engine(settings.DATABASE_URL, **engine_args)

@event.listens_for(engine, "connect")
def connect(dbapi_connection, connection_record):
    connection_record.info['pid'] = id(connection_record)
    logger.info("Nouvelle connexion à la base de données établie")

@event.listens_for(engine, "checkout")
def checkout(dbapi_connection, connection_record, connection_proxy):
    pid = connection_record.info['pid']
    if not connection_record.connection:
        logger.info("Reconnexion à la base de données")
        connection_record.connection = connection_proxy.connection

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        db.execute(text("SELECT 1"))
        yield db
    except Exception as e:
        logger.error(f"Erreur de connexion à la base de données: {e}")
        db.close()
        time.sleep(1)  
        db = SessionLocal()
        yield db
    finally:
        db.close()

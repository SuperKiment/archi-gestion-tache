import time
import logging
from functools import wraps
from sqlalchemy.exc import OperationalError, SQLAlchemyError

logger = logging.getLogger(__name__)

def retry_db_operation(max_retries=3, delay=1):
    """
    Décorateur pour réessayer les opérations de base de données qui échouent
    
    Args:
        max_retries (int): Nombre maximal de tentatives
        delay (int): Délai en secondes entre les tentatives
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            retries = 0
            while retries < max_retries:
                try:
                    return func(*args, **kwargs)
                except (OperationalError, SQLAlchemyError) as e:
                    retries += 1
                    if retries >= max_retries:
                        logger.error(f"Échec de l'opération après {max_retries} tentatives: {e}")
                        raise
                    logger.warning(f"Tentative {retries}/{max_retries} a échoué: {e}. Nouvelle tentative dans {delay} secondes.")
                    time.sleep(delay)
        return wrapper
    return decorator

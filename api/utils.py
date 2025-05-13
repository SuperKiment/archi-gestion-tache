import time
import logging
import traceback
from functools import wraps
from sqlalchemy.exc import OperationalError, SQLAlchemyError, IntegrityError

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
            last_exception = None
            
            while retries < max_retries:
                try:
                    return func(*args, **kwargs)
                except (OperationalError, IntegrityError, SQLAlchemyError) as e:
                    # Erreurs spécifiques à la base de données
                    last_exception = e
                    retries += 1
                    if retries >= max_retries:
                        logger.error(f"Échec de l'opération après {max_retries} tentatives: {e}")
                        logger.error(traceback.format_exc())
                        # Ne pas relancer l'exception de la base de données mais plutôt 
                        # une exception personnalisée avec un message plus clair
                        raise ValueError(f"Erreur de base de données: {str(e)}")
                    
                    logger.warning(f"Tentative {retries}/{max_retries} a échoué: {e}. Nouvelle tentative dans {delay} secondes.")
                    time.sleep(delay)
                except Exception as e:
                    # Autres erreurs non liées à la base de données
                    # Pour ces erreurs, on ne réessaie pas
                    logger.error(f"Erreur non liée à la base de données dans {func.__name__}: {e}")
                    logger.error(traceback.format_exc())
                    raise
            
            # Si on arrive ici, c'est que toutes les tentatives ont échoué
            if last_exception:
                raise ValueError(f"Échec après {max_retries} tentatives: {str(last_exception)}")
            
        return wrapper
    return decorator

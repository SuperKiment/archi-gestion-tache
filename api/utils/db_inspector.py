from sqlalchemy import inspect, create_engine, text
from api.config import settings
import os
import logging

# Configuration du logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_db_connection():
    """Établit une connexion à la base de données"""
    try:
        engine = create_engine(settings.DATABASE_URL)
        conn = engine.connect()
        return conn
    except Exception as e:
        logger.error(f"Erreur de connexion à la base de données: {e}")
        return None

def get_all_tables():
    """Récupère toutes les tables de la base de données"""
    try:
        conn = get_db_connection()
        if not conn:
            return []
        
        inspector = inspect(conn.engine)
        tables = inspector.get_table_names()
        conn.close()
        return tables
    except Exception as e:
        logger.error(f"Erreur lors de la récupération des tables: {e}")
        return []

def get_table_columns(table_name):
    """Récupère les colonnes d'une table spécifique"""
    try:
        conn = get_db_connection()
        if not conn:
            return []
        
        query = text(f"""
        SELECT column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = '{table_name}'
        ORDER BY ordinal_position
        """)
        
        result = conn.execute(query)
        columns = []
        for row in result:
            columns.append({
                "name": row[0],
                "type": row[1],
                "nullable": row[2] == 'YES'
            })
        
        conn.close()
        return columns
    except Exception as e:
        logger.error(f"Erreur lors de la récupération des colonnes pour la table {table_name}: {e}")
        return []

def inspect_database_structure():
    """Analyse la structure complète de la base de données"""
    tables = get_all_tables()
    db_structure = {}
    
    for table in tables:
        columns = get_table_columns(table)
        db_structure[table] = columns
    
    return db_structure

def print_database_structure():
    """Affiche la structure de la base de données"""
    db_structure = inspect_database_structure()
    
    logger.info("Structure de la base de données:")
    for table, columns in db_structure.items():
        logger.info(f"\nTable: {table}")
        for col in columns:
            nullable = "NULL" if col["nullable"] else "NOT NULL"
            logger.info(f"  - {col['name']} ({col['type']}) {nullable}")
    
    return db_structure

if __name__ == "__main__":
    print_database_structure()

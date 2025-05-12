from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from api.database import get_db
import logging

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/info",
    tags=["info"]
)

@router.get("/table/{table_name}")
def get_table_info(table_name: str, db: Session = Depends(get_db)):
    """
    Récupère les informations sur la structure d'une table de la base de données
    """
    try:
        # Requête pour obtenir les informations sur les colonnes de la table
        query = text(f"""
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = '{table_name}'
        """)
        
        columns = []
        for row in db.execute(query):
            columns.append({
                "column_name": row[0],
                "data_type": row[1]
            })
        
        if not columns:
            raise HTTPException(status_code=404, detail=f"La table '{table_name}' n'existe pas")
            
        return {
            "table_name": table_name,
            "columns": columns
        }
    except Exception as e:
        logger.error(f"Erreur lors de la récupération des informations sur la table {table_name}: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Erreur lors de la récupération des informations: {str(e)}"
        )

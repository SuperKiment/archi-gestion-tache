from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from api.database import engine, Base
from api.routes import (
    journal_routes, 
    tache_routes,
    info_routes,
    type_routes,
    realisation_routes,
    auth_routes)
import time
import json

# Création des tables dans la base de données
Base.metadata.create_all(bind=engine)

import logging
import sys

# Configuration du logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    force=True
)

# Configuration des handlers
console_handler = logging.StreamHandler(sys.stdout)
console_handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
console_handler.setFormatter(formatter)

# Configuration des loggers
loggers = [
    logging.getLogger('api'),
    logging.getLogger('api.routes'),
    logging.getLogger('api.routes.tache'),
    logging.getLogger('api.crud'),
    logging.getLogger('api.database')
]

for logger in loggers:
    logger.setLevel(logging.DEBUG)
    logger.addHandler(console_handler)
    logger.propagate = False

app = FastAPI(
    title="Archi Gestion de Taches API",
    description="API de gestion des tâches",
    version="1.0.0",
    openapi_url="/openapi.json",
    docs_url="/docs"
)

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Autorise toutes les origines
    allow_credentials=True,
    allow_methods=["*"],  # Autorise toutes les méthodes
    allow_headers=["*"],  # Autorise tous les headers
)

# Middleware de logging
@app.middleware("http")
async def log_requests(request: Request, call_next):
    # Log de la requête
    print("\n" + "="*50)
    print(f"Requête entrante: {request.method} {request.url}")
    
    # Log du body pour les requêtes PUT/POST
    if request.method in ["PUT", "POST"]:
        try:
            body = await request.json()
            print(f"Body de la requête: {json.dumps(body, indent=2)}")
        except:
            print("Pas de body JSON")
    
    # Mesure du temps de réponse
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    
    # Log de la réponse
    print(f"Réponse: {response.status_code}")
    print(f"Temps de traitement: {process_time:.2f}s")
    print("="*50 + "\n")
    
    return response

# Inclusion des routes pour chaque entité
app.include_router(journal_routes.router)
app.include_router(tache_routes.router)
app.include_router(type_routes.router)
app.include_router(realisation_routes.router)
app.include_router(info_routes.router)
app.include_router(auth_routes.router)

@app.on_event("startup")
async def startup_event():
    logger = logging.getLogger('api')
    logger.info("Démarrage de l'API")
    openapi_schema = app.openapi()
    openapi_schema["openapi"] = "3.0.2"
    app.openapi_schema = openapi_schema

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API de gestion des tâches"}
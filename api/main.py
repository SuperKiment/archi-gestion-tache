from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.database import engine, Base
from api.routes import (
    journal_routes, 
    tache_routes,
    info_routes,
    type_routes,
    realisation_routes,
)

# Création des tables dans la base de données
Base.metadata.create_all(bind=engine)

import logging

# Configuration du logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

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

# Inclusion des routes pour chaque entité
app.include_router(journal_routes.router)
app.include_router(tache_routes.router)
app.include_router(type_routes.router)
app.include_router(realisation_routes.router)
app.include_router(info_routes.router)

@app.on_event("startup")
async def startup_event():
    openapi_schema = app.openapi()
    openapi_schema["openapi"] = "3.0.2"
    app.openapi_schema = openapi_schema
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:mspr@postgresql-mspr.kiment.ovh:2476/archi-gestion-tache"

    class Config:
        env_file = ".env"

settings = Settings()

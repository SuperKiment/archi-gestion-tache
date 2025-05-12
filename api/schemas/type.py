from pydantic import BaseModel

class TypeCreate(BaseModel):
    titre: str

class TypeResponse(TypeCreate):
    idType: int

    class Config:
        from_attributes = True

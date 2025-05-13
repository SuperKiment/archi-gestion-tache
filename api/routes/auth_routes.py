import json
from fastapi import APIRouter, HTTPException, Form
from api.utils.auth import create_access_token
from passlib.context import CryptContext
import os

router = APIRouter(prefix="/auth", tags=["Auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
USERS_FILE = "api/users.json"

def load_users():
    with open(USERS_FILE, "r") as f:
        return json.load(f)
    
def save_users(users):
    with open(USERS_FILE, "w") as f:
        json.dump(users, f, indent=2)

@router.post("/register")
def register(
    nom: str = Form(...),
    prenom: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    role: str = Form(...)
):
    users = load_users()
    if any(u["email"] == email for u in users):
        raise HTTPException(status_code=400, detail="email existe déjà")
    hashed_password = pwd_context.hash(password)
    new_id = max([u["id"] for u in users], default=0) + 1
    user = {
        "id": new_id,
        "nom": nom,
        "prenom": prenom,
        "email": email,
        "password": hashed_password,
        "role": role
    }
    users.append(user)
    save_users(users)
    return {"message": "User enregistré avec succès", "user": user}

@router.post("/login")
def login(email: str = Form(...), password: str = Form(...)):
    users = load_users()
    user = next((u for u in users if u["email"] == email), None)
    if user and pwd_context.verify(password, user["password"]):
        access_token = create_access_token(data={"sub": email})
        return {"access_token": access_token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Identifiants invalides")

@router.get("/users")
def get_users():
    users = load_users()
    return users

@router.get("/user/{user_id}")
def get_user(user_id: int):
    users = load_users()
    user = next((u for u in users if u["id"] == user_id), None)
    if user:
        return user
    raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
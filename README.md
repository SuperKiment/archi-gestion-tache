# Opti-Tache - Gestion de Tâches Sous-traitées

## Description
Opti-Tache est une application web moderne permettant la gestion simplifiée des tâches sous-traitées. Elle offre une interface intuitive pour les gestionnaires et les prestataires, facilitant la publication, l'attribution et le suivi des tâches.

## Fonctionnalités Principales
- 🔐 Authentification sécurisée avec JWT
- 👥 Gestion des rôles (Gestionnaire/Prestataire)
- 📝 Création et modification de tâches
- 📊 Suivi des priorités et des échéances
- 💰 Gestion des prix et des types de tâches
- 📱 Interface responsive et moderne

## Technologies Utilisées
### Frontend
- Vue.js 3
- Vue Router
- CSS moderne avec variables personnalisées
- Local Storage pour la persistance des données

### Backend
- FastAPI (Python)
- SQLAlchemy pour l'ORM
- JWT pour l'authentification
- Bcrypt pour le hachage des mots de passe

## Prérequis
- Python 3.8+
- Node.js 14+
- npm ou yarn
- Base de données PostgreSQL

## Installation

### Backend
1. Cloner le repository
```bash
git clone [URL_DU_REPO]
cd archi-gestion-tache
```

2. Créer un environnement virtuel Python
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows
```

3. Installer les dépendances Python
```bash
pip install -r requirements.txt
```

4. Lancer le serveur
```bash
uvicorn api.main:app --reload
```

### Frontend
1. Naviguer vers le dossier frontend
```bash
cd web/archi-gestion-tache-vue
```

2. Installer les dépendances
```bash
npm install
# ou
yarn install
```

3. Lancer le serveur de développement
```bash
npm run dev
# ou
yarn dev
```

## Structure du Projet
```
archi-gestion-tache/
├── api/                    # Backend FastAPI
│   ├── crud/              # Opérations CRUD
│   ├── models/            # Modèles SQLAlchemy
│   ├── routes/            # Routes API
│   ├── schemas/           # Schémas Pydantic
│   └── utils/             # Utilitaires
├── web/                   # Frontend Vue.js
│   └── archi-gestion-tache-vue/
│       ├── src/
│       │   ├── components/
│       │   ├── views/
│       │   ├── functions/
│       │   └── router/
│       └── public/
└── README.md
```

## Utilisation

### Gestionnaires
1. Se connecter avec vos identifiants
2. Accéder au tableau de bord
3. Créer/modifier/supprimer des tâches
4. Suivre l'avancement des tâches

### Prestataires
1. Se connecter avec vos identifiants
2. Voir les tâches assignées
3. Mettre à jour le statut des tâches

## Sécurité
- Authentification JWT
- Hachage des mots de passe avec Bcrypt
- Validation des données côté serveur
- Protection contre les injections SQL

## Contribution
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request
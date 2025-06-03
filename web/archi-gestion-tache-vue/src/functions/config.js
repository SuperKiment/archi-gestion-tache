/**
 * Configuration pour les appels API
 */

// URL de base de l'API
export const API_URL = 'http://localhost:8000';

// Variable pour stocker le token JWT
let JWT = '';

// Fonction pour définir le token JWT
export const setJWT = (token) => {
  JWT = token;
  localStorage.setItem('jwt_token', token);
};

// Fonction pour récupérer le token JWT
export const getJWT = () => {
  if (!JWT) {
    JWT = localStorage.getItem('jwt_token') || '';
  }
  return JWT;
};

export const removeJWT = () => {
  JWT = '';
  localStorage.removeItem('jwt_token');
};

// Headers par défaut pour les requêtes
export const defaultHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // Ajouter le token JWT s'il existe
  if (getJWT()) {
    headers['Authorization'] = `Bearer ${getJWT()}`;
  }

  return headers;
};

// Fonction utilitaire pour gérer les erreurs des requêtes
export const handleApiError = (error) => {
  console.error('Erreur API:', error);
  
  // Si l'erreur est une chaîne de caractères, la retourner directement
  if (typeof error === 'string') {
    return {
      error: true,
      message: error,
      status: 0
    };
  }

  // Si l'erreur est un objet avec une propriété message
  if (error && typeof error === 'object' && error.message) {
    return {
      error: true,
      message: error.message,
      status: error.status || 0
    };
  }
  
  // Pour les autres types d'erreurs
  return {
    error: true,
    message: 'Une erreur inconnue est survenue',
    status: 0
  };
}; 
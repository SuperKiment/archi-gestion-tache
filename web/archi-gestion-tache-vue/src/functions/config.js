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
};

// Fonction pour récupérer le token JWT
export const getJWT = () => JWT;

// Headers par défaut pour les requêtes
export const defaultHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // Ajouter le token JWT s'il existe
  if (JWT) {
    headers['Authorization'] = `Bearer ${JWT}`;
  }

  return headers;
};

// Fonction utilitaire pour gérer les erreurs des requêtes
export const handleApiError = (error) => {
  console.error('Erreur API:', error);
  
  // Gérer le cas où l'erreur est une instance d'Error
  if (error instanceof Error) {
    // Vérifier si c'est une erreur HTTP
    if (error.message.startsWith('Erreur HTTP:')) {
      const statusMatch = error.message.match(/Erreur HTTP: (\d+)/);
      const status = statusMatch ? parseInt(statusMatch[1]) : 500;
      
      if (status === 401 || status === 403) {
        return {
          error: true,
          message: 'Authentification requise ou accès non autorisé',
          status
        };
      } else if (status === 404) {
        return {
          error: true,
          message: 'Ressource non trouvée',
          status
        };
      } else if (status === 422) {
        return {
          error: true,
          message: 'Données invalides',
          status
        };
      } else if (status >= 500) {
        return {
          error: true,
          message: 'Erreur serveur',
          status
        };
      } else {
        return {
          error: true,
          message: `Erreur HTTP ${status}`,
          status
        };
      }
    }
    
    // Pour les autres types d'erreurs
    return {
      error: true,
      message: error.message || 'Une erreur inconnue est survenue',
      status: 0
    };
  }
  
  // Gestion des réponses d'API plus structurées (en cas d'utilisation d'axios)
  if (error.response) {
    // La requête a été faite et le serveur a répondu avec un code d'erreur
    return {
      error: true,
      message: error.response.data?.detail || 'Erreur serveur',
      status: error.response.status,
    };
  } else if (error.request) {
    // La requête a été faite mais aucune réponse n'a été reçue
    return {
      error: true,
      message: 'Pas de réponse du serveur',
      status: 0,
    };
  } else {
    // Pour tout autre type d'erreur
    return {
      error: true,
      message: 'Erreur inconnue lors de la communication avec le serveur',
      status: 0,
    };
  }
}; 
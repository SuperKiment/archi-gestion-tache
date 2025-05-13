import { API_URL, defaultHeaders, handleApiError } from './config';

/**
 * Récupère toutes les réalisations
 * @returns {Promise<Array>} Liste des réalisations
 */
export const getRealisations = async () => {
  try {
    const response = await fetch(`${API_URL}/realisation/`, {
      method: 'GET',
      headers: defaultHeaders,
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Récupère une réalisation par son ID
 * @param {number} id - ID de la réalisation
 * @returns {Promise<Object>} Détails de la réalisation
 */
export const getRealisationById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/realisation/${id}`, {
      method: 'GET',
      headers: defaultHeaders,
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Récupère une réalisation par l'ID de sa tâche associée
 * @param {number} idTache - ID de la tâche
 * @returns {Promise<Object>} Détails de la réalisation
 */
export const getRealisationByTacheId = async (idTache) => {
  try {
    const response = await fetch(`${API_URL}/realisation/tache/${idTache}`, {
      method: 'GET',
      headers: defaultHeaders,
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Crée une nouvelle réalisation
 * @param {Object} realisationData - Données de la réalisation
 * @returns {Promise<Object>} Réalisation créée
 */
export const createRealisation = async (realisationData) => {
  try {
    const response = await fetch(`${API_URL}/realisation/`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(realisationData),
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Met à jour une réalisation existante
 * @param {number} id - ID de la réalisation
 * @param {Object} realisationData - Nouvelles données de la réalisation
 * @returns {Promise<Object>} Réalisation mise à jour
 */
export const updateRealisation = async (id, realisationData) => {
  try {
    const response = await fetch(`${API_URL}/realisation/${id}`, {
      method: 'PUT',
      headers: defaultHeaders,
      body: JSON.stringify(realisationData),
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Supprime une réalisation
 * @param {number} id - ID de la réalisation à supprimer
 * @returns {Promise<Object>} Réponse de suppression
 */
export const deleteRealisation = async (id) => {
  try {
    const response = await fetch(`${API_URL}/realisation/${id}`, {
      method: 'DELETE',
      headers: defaultHeaders,
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
}; 
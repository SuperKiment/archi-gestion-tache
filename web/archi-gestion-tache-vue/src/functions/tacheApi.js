import { API_URL, defaultHeaders, handleApiError } from './config';

/**
 * Récupère toutes les tâches
 * @returns {Promise<Array>} Liste des tâches
 */
export const getTaches = async () => {
  try {
    const response = await fetch(`${API_URL}/taches/`, {
      method: 'GET',
      headers: defaultHeaders(),
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
 * Récupère une tâche par son ID
 * @param {number} id - ID de la tâche
 * @returns {Promise<Object>} Détails de la tâche
 */
export const getTacheById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/taches/${id}`, {
      method: 'GET',
      headers: defaultHeaders(),
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
 * Crée une nouvelle tâche
 * @param {Object} tacheData - Données de la tâche
 * @param {number} idGestionnaire - ID du gestionnaire
 * @returns {Promise<Object>} Tâche créée
 */
export const createTache = async (tacheData, idGestionnaire) => {
  try {
    const response = await fetch(`${API_URL}/taches/?id_gestionnaire=${idGestionnaire}`, {
      method: 'POST',
      headers: defaultHeaders(),
      body: JSON.stringify(tacheData),
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
 * Met à jour une tâche existante
 * @param {number} id - ID de la tâche
 * @param {Object} tacheData - Nouvelles données de la tâche
 * @returns {Promise<Object>} Tâche mise à jour
 */
export const updateTache = async (id, tacheData) => {
  try {
    const response = await fetch(`${API_URL}/taches/${id}`, {
      method: 'PUT',
      headers: defaultHeaders(),
      body: JSON.stringify(tacheData),
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
 * Supprime une tâche
 * @param {number} id - ID de la tâche à supprimer
 * @returns {Promise<Object>} Réponse de suppression
 */
export const deleteTache = async (id) => {
  try {
    const response = await fetch(`${API_URL}/taches/${id}`, {
      method: 'DELETE',
      headers: defaultHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
}; 
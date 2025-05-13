import { API_URL, defaultHeaders, handleApiError } from './config';

/**
 * Récupère tous les types
 * @returns {Promise<Array>} Liste des types
 */
export const getTypes = async () => {
  try {
    const response = await fetch(`${API_URL}/types/`, {
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
 * Récupère un type par son ID
 * @param {number} id - ID du type
 * @returns {Promise<Object>} Détails du type
 */
export const getTypeById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/types/${id}`, {
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
 * Crée un nouveau type
 * @param {Object} typeData - Données du type
 * @returns {Promise<Object>} Type créé
 */
export const createType = async (typeData) => {
  try {
    const response = await fetch(`${API_URL}/types/`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(typeData),
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
 * Met à jour un type existant
 * @param {number} id - ID du type
 * @param {Object} typeData - Nouvelles données du type
 * @returns {Promise<Object>} Type mis à jour
 */
export const updateType = async (id, typeData) => {
  try {
    const response = await fetch(`${API_URL}/types/${id}`, {
      method: 'PUT',
      headers: defaultHeaders,
      body: JSON.stringify(typeData),
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
 * Supprime un type
 * @param {number} id - ID du type à supprimer
 * @returns {Promise<Object>} Réponse de suppression
 */
export const deleteType = async (id) => {
  try {
    const response = await fetch(`${API_URL}/types/${id}`, {
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
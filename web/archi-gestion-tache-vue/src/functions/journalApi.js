import { API_URL, defaultHeaders, handleApiError } from './config';

/**
 * Récupère tous les journaux
 * @returns {Promise<Array>} Liste des journaux
 */
export const getJournaux = async () => {
  try {
    const response = await fetch(`${API_URL}/journaux/`, {
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
 * Récupère un journal par son ID
 * @param {number} id - ID du journal
 * @returns {Promise<Object>} Détails du journal
 */
export const getJournalById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/journaux/${id}`, {
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
 * Crée un nouveau journal
 * @param {Object} journalData - Données du journal
 * @returns {Promise<Object>} Journal créé
 */
export const createJournal = async (journalData) => {
  try {
    const response = await fetch(`${API_URL}/journaux/`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(journalData),
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
 * Supprime un journal
 * @param {number} id - ID du journal à supprimer
 * @returns {Promise<Object>} Réponse de suppression
 */
export const deleteJournal = async (id) => {
  try {
    const response = await fetch(`${API_URL}/journaux/${id}`, {
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
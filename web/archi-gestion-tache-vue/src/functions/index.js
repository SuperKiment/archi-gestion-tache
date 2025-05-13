/**
 * Fichier d'exportation centralisé pour toutes les fonctions API
 */

// Configuration
export * from './config';

// API Tâches
export * as tacheApi from './tacheApi';

// API Types
export * as typeApi from './typeApi';

// API Réalisations
export * as realisationApi from './realisationApi';

// API Journaux
export * as journalApi from './journalApi';

// Fonction utilitaire pour obtenir les informations sur les tables
export const getTableInfo = async (tableName) => {
  try {
    const { API_URL, defaultHeaders } = await import('./config');
    const response = await fetch(`${API_URL}/info/table/${tableName}`, {
      method: 'GET',
      headers: defaultHeaders,
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    const { handleApiError } = await import('./config');
    return handleApiError(error);
  }
}; 
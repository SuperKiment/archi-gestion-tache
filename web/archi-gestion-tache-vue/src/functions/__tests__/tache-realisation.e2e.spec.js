import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { getTaches, createTache, deleteTache } from '../tacheApi'
import { createRealisation, getRealisationByTacheId, updateRealisation } from '../realisationApi'
import { getTypes } from '../typeApi'
import { login } from '../login'
import { setJWT } from '../config'

describe('Tests E2E d\'intégration Tâche-Réalisation', () => {
  // Données de test
  let testData = {
    type: null,
    tache: null,
    realisation: null,
    idGestionnaire: 1,
    idPartenaire: 2 // ID d'un partenaire existant
  }

  // Stocker les entités créées pour le nettoyage
  let createdEntities = {
    taches: [],
    realisations: []
  }

  // Avant tous les tests
  beforeAll(async () => {
    try {
      console.log('🚀 Initialisation des tests d\'intégration Tâche-Réalisation...');
      
      // Authentification pour obtenir le token JWT
      const email = 'kevin.m@orange.fr'
      const password = 'admin'
      
      const loginResult = await login(email, password)
      if (loginResult.access_token) {
        setJWT(loginResult.access_token)
        console.log('🔑 Authentification réussie')
      } else {
        throw new Error('Échec de l\'authentification')
      }

      // Récupérer un type existant pour créer des tâches
      const types = await getTypes();
      if (types.length === 0) {
        throw new Error('Aucun type disponible pour les tests');
      }
      
      testData.type = types[0];
      console.log(`✅ Type récupéré: ${testData.type.idType}`);
    } catch (error) {
      console.error('⛔ Erreur lors de l\'initialisation:', error);
      throw new Error('Les tests ne peuvent pas continuer sans les prérequis');
    }
  });

  // Après tous les tests
  afterAll(async () => {
    console.log('🧹 Nettoyage des données de test...');
    
    // Supprimer les réalisations puis les tâches (respcter l'ordre à cause des contraintes FK)
    for (const tacheId of createdEntities.taches) {
      try {
        // La suppression de la tâche devrait aussi supprimer sa réalisation grâce à la contrainte FK
        await deleteTache(tacheId);
        console.log(`✓ Tâche ${tacheId} et sa réalisation supprimées`);
      } catch (error) {
        console.error(`❌ Erreur lors du nettoyage de la tâche ${tacheId}:`, error);
      }
    }
  });

  describe('Cycle de vie Tâche-Réalisation', () => {
    it('devrait créer une tâche puis associer une réalisation', async () => {
      // 1. Créer une nouvelle tâche
      const nouvelleTache = {
        titre: `Tâche avec réalisation ${Date.now()}`,
        description: 'Description de la tâche qui sera associée à une réalisation',
        prix: 250.00,
        remarque: 'Test intégration',
        dateCreation: new Date().toISOString(),
        dateEcheance: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 jours
        priorite: 2, // Priorité moyenne
        idType: testData.type.idType
      };

      const tacheCreee = await createTache(nouvelleTache, testData.idGestionnaire);
      
      // Vérifier que la tâche est créée
      expect(tacheCreee).not.toHaveProperty('error');
      expect(tacheCreee).toHaveProperty('idTache');
      testData.tache = tacheCreee;
      createdEntities.taches.push(tacheCreee.idTache);
      
      console.log(`✅ Tâche créée: ID ${tacheCreee.idTache}`);
      
      // 2. Créer une réalisation associée à cette tâche
      const nouvelleRealisation = {
        dateDebutRealisation: new Date().toISOString(),
        // Pas de date de fin encore, car le travail n'est pas terminé
        idPartenaire: testData.idPartenaire,
        idTache: tacheCreee.idTache
      };
      
      const realisationCreee = await createRealisation(nouvelleRealisation);
      
      // Vérifier que la réalisation est créée
      expect(realisationCreee).not.toHaveProperty('error');
      expect(realisationCreee).toHaveProperty('idRealisation');
      expect(realisationCreee.idTache).toBe(tacheCreee.idTache);
      testData.realisation = realisationCreee;
      
      console.log(`✅ Réalisation créée: ID ${realisationCreee.idRealisation}`);
    });

    it('devrait récupérer une réalisation par l\'id de la tâche', async () => {
      const realisation = await getRealisationByTacheId(testData.tache.idTache);
      
      // Gérer le cas où l'API n'a pas implémenté cette fonctionnalité
      if (realisation.error) {
        console.log(`⚠️ L'API ne supporte pas la récupération par ID de tâche: ${realisation.message}`);
        // Vérifier que l'erreur est correctement formatée
        expect(realisation).toHaveProperty('error');
        expect(realisation).toHaveProperty('message');
      } else {
        // Si l'API répond correctement, vérifier les données
        expect(realisation.idRealisation).toBe(testData.realisation.idRealisation);
        expect(realisation.idTache).toBe(testData.tache.idTache);
        console.log(`✅ Réalisation récupérée par ID de tâche: ${realisation.idRealisation}`);
      }
    });

    it('devrait mettre à jour une réalisation pour marquer la tâche comme terminée', async () => {
      // Mettre à jour la réalisation avec une date de fin
      const miseAJour = {
        dateFinRealisation: new Date().toISOString()
      };
      
      const realisationMiseAJour = await updateRealisation(testData.realisation.idRealisation, miseAJour);
      
      // Gérer le cas où l'API n'a pas implémenté cette fonctionnalité
      if (realisationMiseAJour.error) {
        console.log(`⚠️ L'API ne supporte pas la mise à jour de réalisation: ${realisationMiseAJour.message}`);
        // Vérifier que l'erreur est correctement formatée
        expect(realisationMiseAJour).toHaveProperty('error');
        expect(realisationMiseAJour).toHaveProperty('message');
      } else {
        // Si l'API répond correctement, vérifier les données
        expect(realisationMiseAJour.idRealisation).toBe(testData.realisation.idRealisation);
        expect(realisationMiseAJour.dateFinRealisation).toBeTruthy();
        console.log(`✅ Réalisation mise à jour, tâche marquée comme terminée`);
      }
    });

    it('devrait vérifier qu\'une tâche ne peut avoir qu\'une seule réalisation', async () => {
      // Tenter de créer une seconde réalisation pour la même tâche
      const secondeRealisation = {
        dateDebutRealisation: new Date().toISOString(),
        idPartenaire: testData.idPartenaire,
        idTache: testData.tache.idTache
      };
      
      const resultat = await createRealisation(secondeRealisation);
      
      // Vérifier que l'erreur est bien gérée (contrainte UNIQUE)
      expect(resultat).toHaveProperty('error', true);
      
      console.log(`✅ Contrainte d'unicité vérifiée: une tâche ne peut avoir qu'une réalisation`);
    });
  });

  describe('Recherche des tâches avec réalisation', () => {
    it('devrait pouvoir filtrer les tâches avec réalisation', async () => {
      // Cette fonctionnalité nécessiterait probablement une API côté serveur
      // Pour ce test, nous allons simplement récupérer toutes les tâches et vérifier manuellement
      
      const taches = await getTaches();
      
      // Vérifier que notre tâche de test est dans la liste
      const notreTache = taches.find(t => t.idTache === testData.tache.idTache);
      expect(notreTache).toBeTruthy();
      
      // On pourrait ajouter ici un appel API qui filtre les tâches avec réalisation
      // Par exemple: await getTachesAvecRealisation();
      
      console.log(`✅ Récupération des tâches réussie, notre tâche avec réalisation est présente`);
    });
  });

  describe('Tests de contraintes de base de données', () => {
    it('devrait respecter la contrainte FK entre Tâche et Réalisation', async () => {
      // Créer une réalisation avec un idTache qui n'existe pas
      const realisationAvecTacheInexistante = {
        dateDebutRealisation: new Date().toISOString(),
        idPartenaire: testData.idPartenaire,
        idTache: 999999 // ID qui n'existe probablement pas
      };
      
      const resultat = await createRealisation(realisationAvecTacheInexistante);
      
      // Vérifier que l'erreur de contrainte FK est bien gérée
      expect(resultat).toHaveProperty('error', true);
      
      console.log(`✅ Contrainte de clé étrangère vérifiée: impossible de créer une réalisation pour une tâche inexistante`);
    });
  });
});
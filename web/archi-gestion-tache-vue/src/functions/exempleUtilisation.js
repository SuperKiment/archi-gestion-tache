/**
 * Exemples d'utilisation des fonctions API
 * Ce fichier est à titre d'exemple et n'est pas destiné à être utilisé en production
 */

import { tacheApi, typeApi, journalApi, realisationApi, getTableInfo } from './index';

/**
 * Exemple d'utilisation des API des tâches dans un composant Vue
 */
export const exempleUtilisationTaches = {
  data() {
    return {
      taches: [],
      tacheCourante: null,
      nouvelleTache: {
        titre: '',
        description: '',
        dateDebut: new Date().toISOString().slice(0, 10),
        dateFin: new Date().toISOString().slice(0, 10),
        // autres champs selon les besoins...
      },
      chargement: false,
      erreur: null,
    };
  },

  methods: {
    // Récupérer toutes les tâches
    async chargerTaches() {
      this.chargement = true;
      try {
        const resultat = await tacheApi.getTaches();
        if (resultat.error) {
          this.erreur = resultat.message;
        } else {
          this.taches = resultat;
          this.erreur = null;
        }
      } catch (err) {
        this.erreur = "Erreur lors du chargement des tâches";
        console.error(err);
      } finally {
        this.chargement = false;
      }
    },

    // Récupérer une tâche par son ID
    async chargerTache(id) {
      this.chargement = true;
      try {
        const resultat = await tacheApi.getTacheById(id);
        if (resultat.error) {
          this.erreur = resultat.message;
        } else {
          this.tacheCourante = resultat;
          this.erreur = null;
        }
      } catch (err) {
        this.erreur = "Erreur lors du chargement de la tâche";
        console.error(err);
      } finally {
        this.chargement = false;
      }
    },

    // Créer une nouvelle tâche
    async creerTache(idGestionnaire) {
      this.chargement = true;
      try {
        const resultat = await tacheApi.createTache(this.nouvelleTache, idGestionnaire);
        if (resultat.error) {
          this.erreur = resultat.message;
        } else {
          // Réinitialiser la nouvelle tâche
          this.nouvelleTache = {
            titre: '',
            description: '',
            dateDebut: new Date().toISOString().slice(0, 10),
            dateFin: new Date().toISOString().slice(0, 10),
            // autres champs selon les besoins...
          };
          
          // Actualiser la liste des tâches
          await this.chargerTaches();
          
          this.erreur = null;
          return resultat; // Retourner la nouvelle tâche créée
        }
      } catch (err) {
        this.erreur = "Erreur lors de la création de la tâche";
        console.error(err);
      } finally {
        this.chargement = false;
      }
    },

    // Mettre à jour une tâche existante
    async mettreAJourTache(id, donneesModifiees) {
      this.chargement = true;
      try {
        const resultat = await tacheApi.updateTache(id, donneesModifiees);
        if (resultat.error) {
          this.erreur = resultat.message;
        } else {
          // Actualiser la tâche courante et la liste
          if (this.tacheCourante && this.tacheCourante.id === id) {
            this.tacheCourante = resultat;
          }
          await this.chargerTaches();
          
          this.erreur = null;
          return resultat;
        }
      } catch (err) {
        this.erreur = "Erreur lors de la mise à jour de la tâche";
        console.error(err);
      } finally {
        this.chargement = false;
      }
    },

    // Supprimer une tâche
    async supprimerTache(id) {
      if (!confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
        return;
      }
      
      this.chargement = true;
      try {
        const resultat = await tacheApi.deleteTache(id);
        if (resultat.error) {
          this.erreur = resultat.message;
        } else {
          // Réinitialiser la tâche courante si nécessaire
          if (this.tacheCourante && this.tacheCourante.id === id) {
            this.tacheCourante = null;
          }
          
          // Actualiser la liste des tâches
          await this.chargerTaches();
          
          this.erreur = null;
          return true;
        }
      } catch (err) {
        this.erreur = "Erreur lors de la suppression de la tâche";
        console.error(err);
      } finally {
        this.chargement = false;
      }
    },
  },

  // Charger les tâches au montage du composant
  mounted() {
    this.chargerTaches();
  },
}; 
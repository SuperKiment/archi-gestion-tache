<template>
  <div class="add-task">
    <section class="add-task-section">
      <div class="add-task-content">
        <h1 class="add-task-title">Ajouter une nouvelle tâche</h1>
        <p class="add-task-description">
          Remplissez les informations pour ajouter une nouvelle tâche à votre gestion.
        </p>

        <form @submit.prevent="handleSubmit">
          <div class="input-group">
            <label for="taskTitle" class="input-label">Titre de la tâche</label>
            <input type="text" id="taskTitle" v-model="taskTitle" placeholder="Entrez un titre pour la tâche"
              class="input-field" required />
          </div>

          <div class="input-group">
            <label for="taskDescription" class="input-label">Description</label>
            <textarea id="taskDescription" v-model="taskDescription" placeholder="Décrivez la tâche" class="input-field"
              rows="4" required></textarea>
          </div>

          <div class="input-group">
            <label for="taskPrice" class="input-label">Prix</label>
            <input type="number" id="taskPrice" v-model="taskPrice" class="input-field" required />
          </div>

          <div class="input-group">
            <label for="taskType" class="input-label">Type de tâche</label>
            <select id="taskType" v-model="taskType" class="input-field" required>
              <option :value="1">Type 1</option>
              <option :value="2">Type 2</option>
              <option :value="3">Type 3</option>
            </select>
          </div>

          <div class="input-group">
            <label for="taskPriority" class="input-label">Priorité</label>
            <select id="taskPriority" v-model="taskPriority" class="input-field" required>
              <option :value="1">Haute</option>
              <option :value="2">Moyenne</option>
              <option :value="3">Basse</option>
            </select>
          </div>

          <div class="input-group">
            <label for="dueDate" class="input-label">Date d'échéance</label>
            <input type="date" id="dueDate" v-model="dueDate" class="input-field" required />
          </div>

          <div class="add-task-actions">
            <button type="submit" class="btn btn-primary" :disabled="loading">
              {{ loading ? 'Création en cours...' : 'Ajouter la tâche' }}
            </button>
          </div>

          <div class="cancel-link">
            <router-link to="/dashboardGestionnaire" class="link">Annuler</router-link>
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { createTache } from '@/functions/tacheApi';
import { useRouter } from 'vue-router';

export default {
  name: 'AddTask',
  data() {
    return {
      taskTitle: '',
      taskDescription: '',
      taskPrice: 0,
      taskType: 1,
      taskPriority: 2,
      dueDate: '',
      error: null,
      loading: false
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      this.error = null;

      try {
        const taskData = {
          titre: this.taskTitle,
          description: this.taskDescription,
          prix: parseFloat(this.taskPrice),
          idType: parseInt(this.taskType),
          priorite: parseInt(this.taskPriority),
          dateEcheance: this.dueDate
        };

        console.log('Données envoyées:', taskData);

        // Récupérer l'ID du gestionnaire depuis le localStorage
        const idGestionnaire = parseInt(localStorage.getItem('user_id'));
        if (!idGestionnaire) {
          throw new Error("ID du gestionnaire non trouvé");
        }

        const result = await createTache(taskData, idGestionnaire);

        if (result.error) {
          this.error = result.message;
        } else {
          // Redirection vers la liste des tâches en cas de succès
          this.$router.push('/taskList');
        }
      } catch (err) {
        console.error('Erreur détaillée:', err);
        this.error = err.message || "Une erreur est survenue lors de la création de la tâche";
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.add-task {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.add-task-section {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.add-task-title {
  font-size: 1.8rem;
  color: var(--primary);
  margin-bottom: 1rem;
}

.add-task-description {
  color: var(--dark);
  margin-bottom: 2rem;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--dark);
  font-weight: 500;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.input-field:focus {
  outline: none;
  border-color: var(--primary);
}

.add-task-actions {
  margin-top: 2rem;
}

.cancel-link {
  margin-top: 1rem;
  text-align: center;
}

.link {
  color: var(--primary);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
  text-align: center;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>

<template>
  <div class="edit-task">
    <section class="edit-task-section">
      <div class="edit-task-content">
        <h1 class="edit-task-title">Modifier la tâche</h1>
        <p class="edit-task-description">
          Modifiez les informations de la tâche ci-dessous.
        </p>

        <form @submit.prevent="handleSubmit">
          <div class="input-group">
            <label for="taskTitle" class="input-label">Titre de la tâche</label>
            <input
              type="text"
              id="taskTitle"
              v-model="taskTitle"
              placeholder="Entrez un titre pour la tâche"
              class="input-field"
              required
            />
          </div>

          <div class="input-group">
            <label for="taskDescription" class="input-label">Description</label>
            <textarea
              id="taskDescription"
              v-model="taskDescription"
              placeholder="Décrivez la tâche"
              class="input-field"
              rows="4"
              required
            ></textarea>
          </div>

          <div class="input-group">
            <label for="taskPriority" class="input-label">Priorité</label>
            <select
              id="taskPriority"
              v-model="taskPriority"
              class="input-field"
              required
            >
              <option :value="1">Haute</option>
              <option :value="2">Moyenne</option>
              <option :value="3">Basse</option>
            </select>
          </div>

          <div class="input-group">
            <label for="dueDate" class="input-label">Date d'échéance</label>
            <input
              type="date"
              id="dueDate"
              v-model="dueDate"
              class="input-field"
              required
            />
          </div>

          <div class="input-group">
            <label for="taskPrice" class="input-label">Prix</label>
            <input
              type="number"
              id="taskPrice"
              v-model="taskPrice"
              class="input-field"
              required
            />
          </div>

          <div class="input-group">
            <label for="taskType" class="input-label">Type de tâche</label>
            <select
              id="taskType"
              v-model="taskType"
              class="input-field"
              required
            >
              <option :value="1">Type 1</option>
              <option :value="2">Type 2</option>
              <option :value="3">Type 3</option>
            </select>
          </div>

          <div class="edit-task-actions">
            <button type="submit" class="btn btn-primary" :disabled="isLoading">
              {{ isLoading ? 'Enregistrement...' : 'Enregistrer les modifications' }}
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
import { getTacheById, updateTache } from '../functions/tacheApi';

export default {
  name: 'EditTask',
  data() {
    return {
      taskTitle: '',
      taskDescription: '',
      taskPriority: 2,
      dueDate: '',
      taskPrice: 0,
      taskType: 1,
      isLoading: false,
      error: null
    }
  },
  async created() {
    try {
      const taskId = this.$route.params.id;
      if (!taskId) {
        this.error = "ID de tâche manquant";
        return;
      }

      const task = await getTacheById(taskId);
      if (task) {
        this.taskTitle = task.titre;
        this.taskDescription = task.description;
        this.taskPriority = task.priorite;
        this.dueDate = task.dateEcheance ? task.dateEcheance.split('T')[0] : '';
        this.taskPrice = task.prix;
        this.taskType = task.idType;
      }
    } catch (error) {
      this.error = "Erreur lors du chargement de la tâche";
      console.error(error);
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      this.error = null;

      try {
        const taskId = this.$route.params.id;
        if (!taskId) {
          throw new Error("ID de tâche manquant");
        }

        const taskData = {
          titre: this.taskTitle,
          description: this.taskDescription,
          priorite: parseInt(this.taskPriority),
          dateEcheance: this.dueDate,
          prix: parseFloat(this.taskPrice),
          idType: parseInt(this.taskType)
        };

        console.log('Données envoyées:', taskData);

        const updatedTask = await updateTache(taskId, taskData);
        if (updatedTask) {
          this.$router.push('/dashboardGestionnaire');
        }
      } catch (error) {
        console.error('Erreur détaillée:', error);
        this.error = error.message || "Erreur lors de la mise à jour de la tâche";
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.edit-task {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.edit-task-section {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.edit-task-title {
  font-size: 1.8rem;
  color: var(--primary);
  margin-bottom: 1rem;
}

.edit-task-description {
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

.edit-task-actions {
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

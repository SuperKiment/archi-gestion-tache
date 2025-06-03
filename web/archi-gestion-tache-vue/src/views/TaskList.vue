<template>
  <div class="task-list">
    <h1 class="title">Mes Tâches</h1>

    <div v-if="tasks.length === 0" class="empty-message">
      Aucune tâche pour le moment.
    </div>

    <div v-else class="task-grid">
      <div v-for="task in tasks" :key="task.id" class="task-card">
        <h2 class="task-title">{{ task.title }}</h2>
        <p class="task-desc">{{ task.description }}</p>

        <div class="task-meta">
          <span class="priority" :class="task.priority">{{ task.priority }}</span>
          <span class="due-date">Échéance : {{ formatDate(task.dueDate) }}</span>
        </div>

        <div class="task-actions">
          <router-link :to="`/editTask/${task.id}`" class="btn btn-edit">Modifier</router-link>
          <button class="btn btn-delete">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTaches } from '@/functions/tacheApi';

export default {
  name: 'TaskList',
  data() {
    return {
      tasks: []
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return '';
      return new Date(date).toLocaleDateString('fr-FR');
    },
    async fetchTasks() {
      // Dans une application réelle, cette méthode ferait un appel API
      // Pour l'exemple, nous utilisons des données statiques
      this.tasks = [];

      try {
        const resultat = await getTaches();
        if (resultat.error) {
          this.erreur = resultat.message;
        } else {
          this.tasks = resultat;
          this.erreur = null;
        }
      } catch (err) {
        this.erreur = "Erreur lors du chargement des tâches";
        console.error(err);
      } finally {
      }
    }
  },
  async mounted() {
    await this.fetchTasks();
  }
}
</script>

<style scoped>
.task-list {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  margin-bottom: 2rem;
  font-size: 2rem;
  color: var(--primary);
}

.empty-message {
  text-align: center;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  font-size: 1.1rem;
  color: #666;
}

.task-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.task-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.task-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.task-title {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--dark);
}

.task-desc {
  color: #666;
  margin-bottom: 1rem;
}

.task-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.priority {
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-weight: 600;
  text-transform: capitalize;
}

.priority.haute {
  background-color: #ffebee;
  color: #e53935;
}

.priority.moyenne {
  background-color: #fff8e1;
  color: #ffb300;
}

.priority.basse {
  background-color: #e8f5e9;
  color: #43a047;
}

.due-date {
  color: #666;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s;
}

.btn-edit {
  background-color: var(--primary-light);
  color: var(--primary);
}

.btn-edit:hover {
  background-color: var(--primary-lighter);
}

.btn-delete {
  background-color: #ffebee;
  color: #e53935;
}

.btn-delete:hover {
  background-color: #ffcdd2;
}
</style>

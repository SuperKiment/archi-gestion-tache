<template>
  <div class="task-list">
    <h1 class="title">Mes Tâches</h1>

    <div class="filters-container">
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Rechercher une tâche..."
          class="search-input"
        >
      </div>

      <div class="filters">
        <select v-model="priorityFilter" class="filter-select">
          <option value="">Toutes les priorités</option>
          <option value="1">Haute priorité</option>
          <option value="2">Priorité moyenne</option>
          <option value="3">Basse priorité</option>
        </select>

        <select v-model="sortBy" class="filter-select">
          <option value="dateEcheance">Trier par date d'échéance</option>
          <option value="priorite">Trier par priorité</option>
          <option value="titre">Trier par titre</option>
        </select>

        <select v-model="sortOrder" class="filter-select">
          <option value="asc">Croissant</option>
          <option value="desc">Décroissant</option>
        </select>
      </div>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="tasks.length === 0" class="empty-message">
      Aucune tâche pour le moment.
    </div>

    <div v-else class="task-grid">
      <div v-for="task in filteredAndSortedTasks" :key="task.idTache" class="task-card">
        <h2 class="task-title">{{ task.titre }}</h2>
        <p class="task-desc">{{ task.description }}</p>

        <div class="task-meta">
          <span class="priority" :class="getPriorityClass(task.priorite)">{{ getPriorityLabel(task.priorite) }}</span>
          <span class="due-date">Échéance : {{ formatDate(task.dateEcheance) }}</span>
        </div>

        <div class="task-actions">
          <router-link :to="`/editTask/${task.idTache}`" class="btn btn-edit">Modifier</router-link>
          <button @click="handleDelete(task.idTache)" class="btn btn-delete">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTaches, deleteTache } from '@/functions/tacheApi';

export default {
  name: 'TaskList',
  data() {
    return {
      tasks: [],
      error: null,
      searchQuery: '',
      priorityFilter: '',
      sortBy: 'dateEcheance',
      sortOrder: 'asc'
    }
  },
  computed: {
    filteredAndSortedTasks() {
      let result = [...this.tasks];

      // Filtre par recherche
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(task => 
          task.titre.toLowerCase().includes(query) || 
          task.description.toLowerCase().includes(query)
        );
      }

      // Filtre par priorité
      if (this.priorityFilter) {
        result = result.filter(task => task.priorite === parseInt(this.priorityFilter));
      }

      // Tri
      result.sort((a, b) => {
        let comparison = 0;
        
        if (this.sortBy === 'dateEcheance') {
          comparison = new Date(a.dateEcheance) - new Date(b.dateEcheance);
        } else if (this.sortBy === 'priorite') {
          comparison = a.priorite - b.priorite;
        } else if (this.sortBy === 'titre') {
          comparison = a.titre.localeCompare(b.titre);
        }

        return this.sortOrder === 'asc' ? comparison : -comparison;
      });

      return result;
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return '';
      return new Date(date).toLocaleDateString('fr-FR');
    },
    getPriorityClass(priority) {
      switch(priority) {
        case 1: return 'haute';
        case 2: return 'moyenne';
        case 3: return 'basse';
        default: return 'moyenne';
      }
    },
    getPriorityLabel(priority) {
      switch(priority) {
        case 1: return 'Haute';
        case 2: return 'Moyenne';
        case 3: return 'Basse';
        default: return 'Moyenne';
      }
    },
    async fetchTasks() {
      try {
        const resultat = await getTaches();
        if (resultat.error) {
          this.error = resultat.message;
        } else {
          this.tasks = resultat;
          this.error = null;
        }
      } catch (err) {
        this.error = "Erreur lors du chargement des tâches";
        console.error(err);
      }
    },
    async handleDelete(taskId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
        try {
          await deleteTache(taskId);
          await this.fetchTasks(); // Recharger la liste après suppression
        } catch (error) {
          this.error = "Erreur lors de la suppression de la tâche";
          console.error(error);
        }
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

.error-message {
  background-color: #ffebee;
  color: #e53935;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
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

.filters-container {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-box {
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-select {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  min-width: 200px;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }
  
  .filter-select {
    width: 100%;
  }
}
</style>

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
</script>

<style scoped>

</style>

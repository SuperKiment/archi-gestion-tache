<template>
  <div class="dashboard">
    <section class="dashboard-header">
      <h1 class="dashboard-title">Bienvenue, Gestionnaire</h1>
      <p class="dashboard-description">
        Gérez, publiez et validez les tâches sous-traitées. Suivez l'avancement des missions des partenaires.
      </p>
    </section>

    <section class="task-actions">
      <div class="task-card">
        <h2 class="task-card-title">Créer une nouvelle tâche</h2>
        <router-link to="/addTask" class="btn btn-primary">Créer une tâche</router-link>
      </div>

      <div class="task-card">
        <h2 class="task-card-title">Modifier une tâche existante</h2>
        <router-link to="/editTask" class="btn btn-secondary">Modifier une tâche</router-link>
      </div>

      <div class="task-card">
        <h2 class="task-card-title">Afficher les tâches en cours</h2>
        <router-link to="/taskList" class="btn btn-secondary">Voir les tâches</router-link>
      </div>
    </section>

    <section class="task-list">
      <h2 class="section-title">Tâches récentes</h2>
      <div class="tasks-grid">
        <div class="task-card-summary">
          <h3 class="task-title">Titre de la tâche</h3>
          <p class="task-description">Description de la tâche. Date limite : 20/05/2025</p>
          <button class="btn btn-info">Voir</button>
        </div>
        <div class="task-card-summary">
          <h3 class="task-title">Titre de la tâche</h3>
          <p class="task-description">Description de la tâche. Date limite : 21/05/2025</p>
          <button class="btn btn-info">Voir</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
}
</script>

<style scoped>

</style>

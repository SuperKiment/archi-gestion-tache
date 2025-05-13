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
              <option value="low">Faible</option>
              <option value="medium">Moyenne</option>
              <option value="high">Haute</option>
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

          <div class="add-task-actions">
            <button type="submit" class="btn btn-primary">Ajouter la tâche</button>
          </div>

          <div class="cancel-link">
            <router-link to="/dashboardGestionnaire" class="link">Annuler</router-link>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>

</script>

<style scoped>

</style>

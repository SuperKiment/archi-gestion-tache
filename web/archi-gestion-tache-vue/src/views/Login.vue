<template>
  <div class="login">
    <section class="login-section">
      <div class="login-content">
        <h1 class="login-title">Se connecter à Opti-Tache</h1>
        <p class="login-description">
          Connectez-vous pour accéder à votre espace de gestion des tâches sous-traitées.
        </p>

        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="username" class="input-label">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="Entrez votre nom d'utilisateur"
              class="input-field"
              required
            />
          </div>

          <div class="input-group">
            <label for="password" class="input-label">Mot de passe</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Entrez votre mot de passe"
              class="input-field"
              required
            />
          </div>

          <div class="login-actions">
            <button type="submit" class="btn btn-primary">Se connecter</button>
          </div>

          <div class="register-link">
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

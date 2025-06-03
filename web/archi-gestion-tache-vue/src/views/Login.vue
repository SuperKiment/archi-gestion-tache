<template>
  <div class="login">
    <section class="login-section">
      <div class="login-content">
        <h1 class="login-title">Se connecter à Opti-Tache</h1>
        <p class="login-description">
          Connectez-vous pour accéder à votre espace de gestion des tâches sous-traitées.
        </p>

        <form @submit.prevent="handleLogin">
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
          
          <div class="input-group">
            <label for="email" class="input-label">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Entrez votre email"
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
import { login } from '@/functions/login';
import { setJWT } from '@/functions/config';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await login(this.email, this.password);
        
        if (response && response.access_token) {
          // Stocker le JWT et les informations de l'utilisateur
          setJWT(response.access_token);
          localStorage.setItem('user_id', response.user_id);
          localStorage.setItem('user_role', response.role);
          
          // Rediriger vers la page d'accueil après connexion réussie
          this.router.push('/');
        } else {
          this.error = 'Informations d\'identification invalides';
        }
      } catch (error) {
        this.error = 'Erreur lors de la connexion';
        console.error('Erreur de connexion:', error);
      }
    }
  }
}
</script>

<style scoped>
.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  text-align: center;
}
</style>

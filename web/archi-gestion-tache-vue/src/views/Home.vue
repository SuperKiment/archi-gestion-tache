<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Gestion simplifiée de vos tâches sous-traitées</h1>
        <p class="hero-description">
          Opti-Tache vous permet de publier, attribuer et suivre les tâches sous-traitées à vos partenaires en toute simplicité.
        </p>
        <div class="hero-buttons">
          <router-link :to="isLoggedIn ? '/dashboardGestionnaire' : '/login'" class="btn btn-primary">Commencer</router-link>
          <router-link v-if="isLoggedIn" to="/mytasks" class="btn btn-primary">Mes Tâches</router-link>
        </div>
      </div>
    </section>

    <section class="features">
      <h2 class="section-title">Fonctionnalités principales</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>Gestion des Tâches</h3>
          <p>Créez, modifiez et suivez vos tâches avec un système de priorités et d'échéances.</p>
        </div>
        <div class="feature-card">
          <h3>Suivi en Temps Réel</h3>
          <p>Visualisez l'état d'avancement de vos tâches et recevez des notifications en temps réel.</p>
        </div>
        <div class="feature-card">
          <h3>Gestion des Utilisateurs</h3>
          <p>Attribuez des tâches aux membres de votre équipe et gérez les permissions.</p>
        </div>
        <div class="feature-card">
          <h3>Tableau de Bord</h3>
          <p>Accédez à une vue d'ensemble de vos projets et tâches avec des statistiques détaillées.</p>
        </div>
      </div>
    </section>

    <section class="workflow">
      <h2 class="section-title">Comment ça fonctionne</h2>
      <div class="workflow-steps">
      </div>
    </section>

    <section class="cta">
      <div class="cta-content">
        <h2 class="cta-title">Prêt à optimiser la gestion de vos tâches sous-traitées ?</h2>
        <p class="cta-description">Commencez dès aujourd'hui à utiliser Opti-Tache pour simplifier la collaboration avec vos partenaires.</p>
        <router-link :to="isLoggedIn ? '/dashboardGestionnaire' : '/login'" class="btn btn-primary cta-button">Commencer maintenant</router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      isLoggedIn: false
    }
  },
  created() {
    this.checkLoginStatus()
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem('jwt_token')
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 1rem;
  margin-bottom: 3rem;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.hero-description {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: white;
  color: #3498db;
  border: 2px solid #3498db;
}

.btn-secondary:hover {
  background-color: #f8f9fa;
  transform: translateY(-2px);
}

.features {
  padding: 4rem 0;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.cta {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  padding: 4rem 2rem;
  border-radius: 1rem;
  text-align: center;
  margin-top: 4rem;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-title {
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-description {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
}

.cta-button {
  background-color: white;
  color: #3498db;
}

.cta-button:hover {
  background-color: #f8f9fa;
  transform: translateY(-2px);
}
</style>
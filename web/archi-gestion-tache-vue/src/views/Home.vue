<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Gestion simplifiée de vos tâches sous-traitées</h1>
        <p class="hero-description">
          Opti-Tache vous permet de publier, attribuer et suivre les tâches sous-traitées à vos partenaires en toute simplicité.
        </p>
        <div class="hero-buttons">
          <router-link to="/login" class="btn btn-primary">Commencer</router-link>
        </div>
      </div>
    </section>

    <section class="features">
      <h2 class="section-title">Fonctionnalités principales</h2>
      <div class="features-grid">
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
        <router-link to="/login" class="btn btn-primary cta-button">Commencer maintenant</router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>

</style>
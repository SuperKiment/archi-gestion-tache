<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-logo">
        <div class="logo-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="logo-icon">
            <path d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zm3 0a.75.75 0 00-.75.75v6c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-6a.75.75 0 00-.75-.75H5.25z" />
          </svg>
          <span class="logo-text">Opti-Tache</span>
        </div>
        <p class="footer-tagline">La solution idéale pour la gestion de vos tâches sous-traitées</p>
      </div>
      
      <div class="footer-links">
        <div class="footer-section">
          <h3 class="footer-title">Navigation</h3>
          <ul class="footer-list">
            <li><router-link to="/">Accueil</router-link></li>
            <li><router-link to="/">À propos</router-link></li>
            <li><router-link to="/">Contact</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">Légal</h3>
          <ul class="footer-list">
            <li><router-link to="/">Confidentialité</router-link></li>
            <li><router-link to="/">Conditions d'utilisation</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">Contact</h3>
          <ul class="footer-list">
            <li>Email: contact@Optitache.com</li>
            <li>Téléphone: +33 1 23 45 67 89</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} Opti-Tache. Tous droits réservés.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background-color: var(--dark);
  color: white;
  margin-top: 3rem;
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.logo-container {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.logo-icon {
  width: 1.75rem;
  height: 1.75rem;
  margin-right: 0.5rem;
  color: white;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #a5b4fc 0%, #38bdf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-tagline {
  color: #94a3b8;
  font-size: 0.875rem;
  max-width: 20rem;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.footer-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
}

.footer-list {
  list-style: none;
}

.footer-list li {
  margin-bottom: 0.5rem;
}

.footer-list a {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-list a:hover {
  color: white;
}

.footer-bottom {
  border-top: 1px solid #334155;
  padding: 1.5rem 2rem;
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
  }
  
  .footer-links {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
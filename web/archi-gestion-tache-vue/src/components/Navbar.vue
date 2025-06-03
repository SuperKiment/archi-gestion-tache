<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-logo">
        <router-link to="/">
          <div class="logo-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="logo-icon">
              <path d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zm3 0a.75.75 0 00-.75.75v6c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-6a.75.75 0 00-.75-.75H5.25z" />
            </svg>
            <span class="logo-text">Opti-Tache</span>
          </div>
        </router-link>
      </div>
      
      <div class="navbar-links">
        <router-link to="/" class="nav-link">Accueil</router-link>
      </div>
      
      <div class="navbar-auth">
        <template v-if="isLoggedIn">
          <button @click="handleLogout" class="btn btn-secondary">Se déconnecter</button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn btn-secondary">Connexion</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
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
    },
    handleLogout() {
      // Supprimer toutes les informations de l'utilisateur
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_role');
      this.isLoggedIn = false;
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1280px;
  margin: 0 auto;
}

.navbar-logo a {
  text-decoration: none;
  color: var(--primary);
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-icon {
  width: 1.75rem;
  height: 1.75rem;
  margin-right: 0.5rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  color: var(--dark);
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--primary);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.navbar-auth {
  display: flex;
  gap: 1rem;
}

@media (max-width: 768px) {
  .navbar-links {
    display: none;
  }
  
  .navbar-container {
    padding: 1rem;
  }
}
</style>
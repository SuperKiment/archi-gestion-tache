import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Navbar from '../Navbar.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Créer un router factice pour les tests
const createTestRouter = () => {
  return createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/home',
        name: 'Home',
        component: { template: '<div>Home</div>' }
      },
      {
        path: '/login',
        name: 'Login',
        component: { template: '<div>Login</div>' }
      }
    ]
  })
}

describe('Navbar Component', () => {
  it('se rend correctement', () => {
    const router = createTestRouter()
    const wrapper = mount(Navbar, {
      global: {
        plugins: [router]
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.navbar').exists()).toBe(true)
    expect(wrapper.find('.logo-text').text()).toBe('Opti-Tache')
  })
  
  it('affiche les liens de navigation corrects', () => {
    const router = createTestRouter()
    const wrapper = mount(Navbar, {
      global: {
        plugins: [router]
      }
    })
    
    const links = wrapper.findAll('a')
    expect(links.length).toBeGreaterThanOrEqual(2)
    
    const homeLink = wrapper.find('.nav-link')
    expect(homeLink.text()).toBe('Accueil')
    
    const loginLink = wrapper.find('.btn-secondary')
    expect(loginLink.text()).toBe('Connexion')
  })
}) 
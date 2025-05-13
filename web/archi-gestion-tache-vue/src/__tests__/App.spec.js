import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Créer un router factice pour les tests
const createTestRouter = () => {
  return createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: { template: '<div class="home-mock">Home View</div>' }
      }
    ]
  })
}

describe('App Component', () => {
  it('doit rendre les composants Navbar et Footer', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    
    // Utiliser mount avec des stubs pour les composants enfants
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        stubs: {
          Navbar: true,
          Footer: true,
          RouterView: true
        }
      }
    })
    
    expect(wrapper.find('.app').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'Navbar' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'Footer' }).exists()).toBe(true)
    expect(wrapper.find('.main-content').exists()).toBe(true)
  })
}) 
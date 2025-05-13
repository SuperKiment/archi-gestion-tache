import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'
import TaskList from '../views/TaskList.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Créer un router pour les tests
const createTestRouter = () => {
  return createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'Home',
        component: { template: '<div class="home-mock">Home View</div>' }
      },
      {
        path: '/tasks',
        name: 'TaskList',
        component: TaskList
      }
    ]
  })
}

describe('Tests d\'intégration', () => {
  it('l\'application a la structure correcte', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        stubs: {
          RouterView: true
        }
      }
    })
    
    // Vérifie que l'application a les composants principaux
    expect(wrapper.find('.app').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'Navbar' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'Footer' }).exists()).toBe(true)
  })
  
  it('la navigation fonctionne correctement', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    // Initialement sur la page d'accueil (redirigé de '/' vers '/home')
    expect(router.currentRoute.value.path).toBe('/home')
    
    // Navigue vers la liste des tâches
    await router.push('/tasks')
    expect(router.currentRoute.value.path).toBe('/tasks')
  })
  
  it('affiche des tâches après le chargement', async () => {
    const router = createTestRouter()
    await router.push('/tasks')
    await router.isReady()
    
    const wrapper = mount(TaskList, {
      global: {
        plugins: [router]
      }
    })
    
    // Vérifie que les tâches sont chargées (méthode fetchTasks est appelée)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.tasks.length).toBeGreaterThan(0)
    
    // Vérifie que les cartes de tâches sont affichées
    const taskCards = wrapper.findAll('.task-card')
    expect(taskCards.length).toBeGreaterThan(0)
    
    // Vérifie que les détails des tâches sont affichés
    expect(taskCards[0].find('.task-title').exists()).toBe(true)
    expect(taskCards[0].find('.task-desc').exists()).toBe(true)
    expect(taskCards[0].find('.priority').exists()).toBe(true)
  })
})
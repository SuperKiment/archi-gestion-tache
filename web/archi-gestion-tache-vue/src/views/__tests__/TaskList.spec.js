import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskList from '../TaskList.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Données de test
const mockTasks = [
  {
    id: 1,
    title: 'Tâche 1',
    description: 'Description de la tâche 1',
    priority: 'haute',
    dueDate: '2023-12-31'
  },
  {
    id: 2,
    title: 'Tâche 2',
    description: 'Description de la tâche 2',
    priority: 'moyenne',
    dueDate: '2023-11-15'
  }
]

// Mock de la fonction formatDate
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('fr-FR')
}

// Créer un router factice pour les tests
const createTestRouter = () => {
  return createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/editTask/:id',
        name: 'EditTask',
        component: { template: '<div>Edit Task</div>' }
      }
    ]
  })
}

describe('TaskList Component', () => {
  let router;
  
  beforeEach(() => {
    router = createTestRouter();
  });
  
  it('affiche un message quand il n\'y a pas de tâches', () => {
    const wrapper = mount(TaskList, {
      global: {
        plugins: [router],
        mocks: {
          formatDate
        }
      },
      data() {
        return {
          tasks: []
        }
      }
    })
    
    expect(wrapper.find('.empty-message').exists()).toBe(true)
    expect(wrapper.find('.empty-message').text()).toBe('Aucune tâche pour le moment.')
    expect(wrapper.find('.task-grid').exists()).toBe(false)
  })
  
  it('affiche correctement la liste des tâches', () => {
    const wrapper = mount(TaskList, {
      global: {
        plugins: [router],
        mocks: {
          formatDate
        }
      },
      data() {
        return {
          tasks: mockTasks,
          formatDate
        }
      }
    })
    
    expect(wrapper.find('.empty-message').exists()).toBe(false)
    expect(wrapper.find('.task-grid').exists()).toBe(true)
    
    const taskCards = wrapper.findAll('.task-card')
    expect(taskCards.length).toBe(2)
    
    expect(taskCards[0].find('.task-title').text()).toBe('Tâche 1')
    expect(taskCards[0].find('.task-desc').text()).toBe('Description de la tâche 1')
    expect(taskCards[0].find('.priority').text()).toBe('haute')
    
    expect(taskCards[1].find('.task-title').text()).toBe('Tâche 2')
    expect(taskCards[1].find('.task-desc').text()).toBe('Description de la tâche 2')
    expect(taskCards[1].find('.priority').text()).toBe('moyenne')
  })
  
  it('appelle fetchTasks lors du montage du composant', async () => {
    // Mock de la méthode fetchTasks
    const fetchTasksSpy = vi.spyOn(TaskList.methods, 'fetchTasks')
    
    const wrapper = mount(TaskList, {
      global: {
        plugins: [router]
      }
    })
    
    // Vérifie que fetchTasks a été appelé
    expect(fetchTasksSpy).toHaveBeenCalledTimes(1)
    
    // Vérifie que les tâches sont chargées
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.tasks.length).toBeGreaterThan(0)
    
    // Nettoyage
    fetchTasksSpy.mockRestore()
  })
}) 
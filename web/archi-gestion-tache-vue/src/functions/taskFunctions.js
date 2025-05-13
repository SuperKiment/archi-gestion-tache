/**
 * Vérifie si la priorité d'une tâche est valide
 * @param {string} priority - La priorité à valider
 * @returns {boolean} - true si la priorité est valide, false sinon
 */
export const validateTaskPriority = (priority) => {
  const validPriorities = ['haute', 'moyenne', 'basse']
  return validPriorities.includes(priority.toLowerCase())
}

/**
 * Formate une date d'échéance de tâche pour l'affichage
 * @param {string} dueDate - La date d'échéance au format chaîne
 * @returns {string} - La date formatée pour l'affichage
 */
export const formatTaskDueDate = (dueDate) => {
  if (!dueDate) return ''
  try {
    const date = new Date(dueDate)
    if (isNaN(date.getTime())) return ''
    return date.toLocaleDateString('fr-FR')
  } catch (e) {
    return ''
  }
}

/**
 * Calcule le statut d'une tâche en fonction de sa date d'échéance et de son état d'achèvement
 * @param {string} dueDate - La date d'échéance au format chaîne
 * @param {boolean} completed - Si la tâche est terminée
 * @returns {string} - Le statut de la tâche ('terminée', 'en retard', 'urgent', 'bientôt', 'à venir', 'indéterminé')
 */
export const calculateTaskStatus = (dueDate, completed = false) => {
  if (completed) return 'terminée'
  
  const today = new Date()
  const due = new Date(dueDate)
  
  if (isNaN(due.getTime())) return 'indéterminé'
  
  if (due < today) return 'en retard'
  
  const diffTime = Math.abs(due - today)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays <= 2) return 'urgent'
  if (diffDays <= 7) return 'bientôt'
  return 'à venir'
}

/**
 * Filtre une liste de tâches par statut
 * @param {Array} tasks - Liste des tâches à filtrer
 * @param {string} status - Statut à filtrer
 * @returns {Array} - Liste des tâches filtrées
 */
export const filterTasksByStatus = (tasks, status) => {
  if (!status || status === 'toutes') return tasks
  
  return tasks.filter(task => {
    const taskStatus = calculateTaskStatus(task.dueDate, task.completed)
    return taskStatus === status
  })
}

/**
 * Trie les tâches selon un critère donné
 * @param {Array} tasks - Liste des tâches à trier
 * @param {string} sortBy - Critère de tri ('dueDate', 'priority'/'priorite', 'title'/'titre')
 * @param {boolean} ascending - Ordre croissant ou décroissant
 * @returns {Array} - Liste des tâches triées
 */
export const sortTasks = (tasks, sortBy = 'dueDate', ascending = true) => {
  const sortFn = (a, b) => {
    let valueA, valueB
    
    if (sortBy === 'dueDate') {
      valueA = new Date(a.dueDate).getTime()
      valueB = new Date(b.dueDate).getTime()
    } else if (sortBy === 'priority' || sortBy === 'priorite') {
      const priorityOrder = { 'haute': 3, 'moyenne': 2, 'basse': 1 }
      // Support both 'priority' and 'priorite'
      const priorityA = a.priority || a.priorite
      const priorityB = b.priority || b.priorite
      
      valueA = priorityA ? priorityOrder[priorityA.toLowerCase()] || 0 : 0
      valueB = priorityB ? priorityOrder[priorityB.toLowerCase()] || 0 : 0
    } else {
      valueA = a[sortBy]
      valueB = b[sortBy]
    }
    
    if (valueA < valueB) return ascending ? -1 : 1
    if (valueA > valueB) return ascending ? 1 : -1
    return 0
  }
  
  return [...tasks].sort(sortFn)
} 
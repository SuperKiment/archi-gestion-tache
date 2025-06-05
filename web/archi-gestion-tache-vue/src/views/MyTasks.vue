<template>
  <div class="container">
    <h1 class="title">Mes Tâches</h1>

    <div class="filters-container">
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Rechercher une tâche..."
          class="search-input"
        >
      </div>

      <div class="filters">
        <div class="filter-group">
          <button
            v-for="option in filtreOptions"
            :key="option.value"
            class="btn"
            :class="filtreActif === option.value ? 'btn-primary' : 'btn-secondary'"
            @click="filtreActif = option.value"
          >
            {{ option.label }}
          </button>
        </div>

        <div class="filter-group">
          <select v-model="sortBy" class="filter-select">
            <option value="echeance">Trier par date d'échéance</option>
            <option value="titre">Trier par titre</option>
            <option value="statut">Trier par statut</option>
          </select>

          <select v-model="sortOrder" class="filter-select">
            <option value="asc">Croissant</option>
            <option value="desc">Décroissant</option>
          </select>

          <button 
            v-if="tachesFiltrees.length > 0"
            @click="exportTasks" 
            class="btn btn-export"
          >
            <i class="fas fa-download"></i> Exporter
          </button>
        </div>
      </div>
    </div>

    <div v-if="tachesFiltrees.length === 0" class="text-gray">
      Aucune tâche à afficher.
    </div>

    <div v-else class="mt-6 ">
      <div
        v-for="tache in tachesFiltrees"
        :key="tache.id"
        class="card mb-4 task-card"
      >
        <div class="flex justify-between items-center mb-2">
          <h2 class="card-title">{{ tache.titre }}</h2>
          <span :class="['badge', getBadgeClass(tache.statut)]">
            {{ tache.statut }}
          </span>
        </div>

        <p class="text-sm text-gray">{{ tache.description }}</p>

        <div class="flex justify-between items-center mt-4">
          <div class="text-xs text-gray">
            Échéance : {{ formatDate(tache.echeance) }}
          </div>
          <button
            v-if="tache.actionable"
            class="btn btn-primary btn-sm"
            @click="accederTache(tache.id)"
          >
            Accéder
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const taches = ref([])
const filtreActif = ref('toutes')
const searchQuery = ref('')
const sortBy = ref('echeance')
const sortOrder = ref('asc')

const filtreOptions = [
  { label: 'Toutes', value: 'toutes' },
  { label: 'En cours', value: 'encours' },
  { label: 'Terminées', value: 'terminees' },
]

onMounted(() => {
  taches.value = [
    {
      id: 1,
      titre: 'Valider les documents',
      description: 'Vérifiez et validez les documents du client Dupont.',
      statut: 'En attente',
      echeance: '2025-05-20',
      actionable: true,
    },
    {
      id: 2,
      titre: 'Signature de contrat',
      description: 'Signer le contrat finalisé pour le dossier n°2034.',
      statut: 'En cours',
      echeance: '2025-05-17',
      actionable: true,
    },
    {
      id: 3,
      titre: 'Revue finale',
      description: 'Relire le contrat avant archivage.',
      statut: 'Complétée',
      echeance: '2025-05-10',
      actionable: false,
    },
  ]
})

const tachesFiltrees = computed(() => {
  let result = [...taches.value]

  // Filtre par statut
  if (filtreActif.value === 'encours') {
    result = result.filter(t => t.statut !== 'Complétée')
  }
  if (filtreActif.value === 'terminees') {
    result = result.filter(t => t.statut === 'Complétée')
  }

  // Filtre par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(tache => 
      tache.titre.toLowerCase().includes(query) || 
      tache.description.toLowerCase().includes(query)
    )
  }

  // Tri
  result.sort((a, b) => {
    let comparison = 0
    
    if (sortBy.value === 'echeance') {
      comparison = new Date(a.echeance) - new Date(b.echeance)
    } else if (sortBy.value === 'titre') {
      comparison = a.titre.localeCompare(b.titre)
    } else if (sortBy.value === 'statut') {
      comparison = a.statut.localeCompare(b.statut)
    }

    return sortOrder.value === 'asc' ? comparison : -comparison
  })

  return result
})

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR')
}

const getBadgeClass = (statut) => {
  switch (statut) {
    case 'En attente':
      return 'badge-warning'
    case 'En cours':
      return 'badge-info'
    case 'Complétée':
      return 'badge-success'
    default:
      return 'badge-secondary'
  }
}

const accederTache = (id) => {
  console.log(`Naviguer vers la tâche ${id}`)
}

const exportTasks = () => {
  // Filtrer uniquement les tâches actives (non terminées)
  const tachesActives = tachesFiltrees.value.filter(tache => tache.statut !== 'Complétée')
  
  // Préparer les données pour l'export
  const dataToExport = tachesActives.map(tache => ({
    Titre: tache.titre,
    Description: tache.description,
    Statut: tache.statut,
    'Date d\'échéance': formatDate(tache.echeance)
  }))

  // Convertir en CSV
  const headers = Object.keys(dataToExport[0])
  const csvContent = [
    headers.join(','),
    ...dataToExport.map(row => 
      headers.map(header => 
        JSON.stringify(row[header] || '')
      ).join(',')
    )
  ].join('\n')

  // Créer et télécharger le fichier
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `taches_actives_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.filters-container {
  margin: 2rem 0;
}

.search-box {
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-select {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  min-width: 200px;
}

.btn {
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: var(--primary-color, #3498db);
  color: white;
}

.btn-secondary {
  background-color: #f8f9fa;
  color: #2c3e50;
  border: 1px solid #ddd;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.task-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.badge {
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.badge-warning {
  background-color: #fff3cd;
  color: #856404;
}

.badge-info {
  background-color: #cce5ff;
  color: #004085;
}

.badge-success {
  background-color: #d4edda;
  color: #155724;
}

.badge-secondary {
  background-color: #e2e3e5;
  color: #383d41;
}

@media (max-width: 768px) {
  .filter-group {
    flex-direction: column;
  }
  
  .filter-select {
    width: 100%;
  }
  
  .btn {
    width: 100%;
  }
}

.btn-export {
  background-color: #2ecc71;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-export:hover {
  background-color: #27ae60;
}

.btn-export i {
  font-size: 0.9rem;
}
</style>

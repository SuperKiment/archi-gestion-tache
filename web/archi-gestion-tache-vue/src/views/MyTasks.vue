<template>
  <div class="container">
    <h1 class="title">Mes Tâches</h1>

    <div class="flex gap-2 mt-4 mb-6">
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
  if (filtreActif.value === 'encours') {
    return taches.value.filter(t => t.statut !== 'Complétée')
  }
  if (filtreActif.value === 'terminees') {
    return taches.value.filter(t => t.statut === 'Complétée')
  }
  return taches.value
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
</script>

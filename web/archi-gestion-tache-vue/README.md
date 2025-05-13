# archi-gestion-tache-vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Tests unitaires

Ce projet utilise [Vitest](https://vitest.dev/) pour les tests unitaires, avec [jsdom](https://github.com/jsdom/jsdom) pour simuler un environnement DOM et [@vue/test-utils](https://test-utils.vuejs.org/) pour les utilitaires de test Vue.

### Exécution des tests

```bash
# Exécuter tous les tests
npm test

# Exécuter les tests en mode watch
npm test -- --watch

# Exécuter les tests une seule fois
npm run test:unit
```

### Structure des tests

Les tests sont organisés dans les dossiers suivants :
- `src/__tests__/` - Pour les tests généraux
- `src/components/__tests__/` - Pour les tests des composants

### Exemple de test

```js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MonComposant from '../MonComposant.vue'

describe('MonComposant', () => {
  it('vérifie que le composant fonctionne correctement', () => {
    const wrapper = mount(MonComposant, { props: { ... } })
    // Vos assertions ici
    expect(wrapper.text()).toContain('Texte attendu')
  })
})
```

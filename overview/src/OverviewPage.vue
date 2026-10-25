<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Deck {
  name: string
  url: string
}

declare const __BUILD_SHA__: string

const decks = ref<Deck[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}decks.json`, { cache: 'no-store' })

    if (!response.ok)
      throw new Error(`HTTP ${response.status}`)

    const data = await response.json() as { decks?: Deck[] }
    decks.value = data.decks ?? []
  }
  catch {
    error.value = 'Oversigten kunne ikke indlæses. Prøv at genindlæse siden.'
  }
  finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="overview">
    <header>
      <p class="eyebrow">CDS.Security</p>
      <h1>Vælg præsentation</h1>
      <p class="intro">Åbn den uge, opgave eller guide, du vil arbejde med.</p>
    </header>

    <p v-if="loading" class="status">Indlæser præsentationer…</p>
    <p v-else-if="error" class="status status--error">{{ error }}</p>
    <p v-else-if="decks.length === 0" class="status">Der er ingen publicerede præsentationer.</p>

    <ul v-else class="deck-list">
      <li v-for="deck in decks" :key="deck.url">
        <a :href="deck.url">
          <span>{{ deck.name }}</span>
          <small>Åbn →</small>
        </a>
      </li>
    </ul>

    <footer v-if="__BUILD_SHA__">Build {{ __BUILD_SHA__ }}</footer>
  </main>
</template>

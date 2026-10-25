<script setup lang="ts">
import { computed } from 'vue'
import { exerciseSession } from '../state/exercise-session'

const completedUrl = computed(() => {
  return exerciseSession.completedUrl.value
    || sessionStorage.getItem('exercise-completed-url')
})
</script>

<template>
  <main class="completed-page" aria-live="polite">
    <article class="completed-card">
      <div class="completed-icon" aria-hidden="true">✓</div>
      <h1>Flot, du har nu klaret opgaverne!</h1>
      <p>
        Du får nu adgang til slides og det øvrige materiale til undervisningen.
      </p>

      <div v-if="completedUrl" class="material-access">
        <span>Dit link til materialet:</span>
        <a
          class="material-url"
          :href="completedUrl"
          target="_blank"
          rel="noopener noreferrer"
        >{{ completedUrl }}</a>
        <a
          class="material-link"
          :href="completedUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Åbn slides og undervisningsmateriale
        </a>
      </div>

      <p v-else class="missing-url" role="alert">
        Linket til undervisningsmaterialet mangler. Gå tilbage og prøv at sende dit svar igen.
      </p>
    </article>
  </main>
</template>

<style scoped>
.completed-page {
  width: min(48rem, 86vw);
}

.completed-card {
  padding: 2.4rem;
  border: 1px solid #bbf7d0;
  border-radius: 1rem;
  background: rgb(255 255 255 / 90%);
  box-shadow: 0 0.75rem 2rem rgb(15 23 42 / 12%);
  color: #0f172a;
  text-align: center;
}

.completed-icon {
  display: grid;
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  border-radius: 50%;
  background: #dcfce7;
  color: #15803d;
  font-size: 2.2rem;
  font-weight: 700;
  place-items: center;
}

h1 {
  margin: 0;
  font-size: 2rem;
}

p {
  max-width: 38rem;
  margin: 0.75rem auto 0;
  color: #475569;
  line-height: 1.55;
}

.material-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.85rem 1.3rem;
  border-radius: 0.55rem;
  background: #2563eb;
  color: white;
  font-weight: 600;
  text-decoration: none;
}

.material-link:hover {
  background: #1d4ed8;
}

.material-access {
  display: flex;
  margin-top: 1.5rem;
  align-items: center;
  flex-direction: column;
}

.material-access span {
  color: #475569;
  font-size: 0.9rem;
  font-weight: 600;
}

.material-url {
  max-width: 100%;
  margin-top: 0.35rem;
  color: #2563eb;
  overflow-wrap: anywhere;
}

.missing-url {
  color: #dc2626;
}
</style>

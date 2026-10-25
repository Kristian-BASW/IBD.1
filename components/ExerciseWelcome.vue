<script setup lang="ts">
import { onSlideEnter, useNav } from '@slidev/client'
import { onMounted, ref } from 'vue'
import type { Exercise } from '../models/exercise'
import { exerciseService } from '../services/exercise-service'
import { exerciseSession } from '../state/exercise-session'

const props = defineProps<{
  exerciseDay: number
}>()

const dailyExercise = ref<Exercise | null>(null)
const dailyLoading = ref(true)
const dailyError = ref<string | null>(null)
const userStatus = ref<'idle' | 'sending' | 'error'>('idle')
const userError = ref<string | null>(null)
let dailyExerciseRequest: Promise<void> | null = null
const { go } = useNav()

async function loadDailyExercise() {
  if (dailyExercise.value || dailyExerciseRequest)
    return dailyExerciseRequest

  dailyLoading.value = true
  dailyError.value = null

  dailyExerciseRequest = (async () => {
    try {
      dailyExercise.value = await exerciseService.getForDay(props.exerciseDay)
    }
    catch (error) {
      console.error(error)
      dailyError.value = 'Informationen om dagens opgave kunne ikke hentes.'
    }
    finally {
      dailyLoading.value = false
      dailyExerciseRequest = null
    }
  })()

  return dailyExerciseRequest
}

async function submitUserId() {
  const userId = exerciseSession.userId.value.trim()

  if (!userId || userStatus.value === 'sending')
    return

  userStatus.value = 'sending'
  userError.value = null
  exerciseSession.completedUrl.value = null
  exerciseSession.exercise.value = null

  try {
    sessionStorage.removeItem('exercise-completed-url')
    sessionStorage.removeItem('exercise-id')
    sessionStorage.removeItem('exercise-data')
  }
  catch (storageError) {
    console.warn('Tidligere materiale-URL kunne ikke fjernes fra sessionStorage.', storageError)
  }

  try {
    exerciseSession.userId.value = userId

    try {
      sessionStorage.setItem('exercise-user-id', userId)
    }
    catch (storageError) {
      console.warn('Bruger-ID kunne ikke gemmes i sessionStorage.', storageError)
    }

    await go(2)
  }
  catch (error) {
    console.error(error)
    exerciseSession.exerciseId.value = null
    userStatus.value = 'error'
    userError.value = 'Bruger-ID’et kunne ikke godkendes. Kontrollér ID’et og prøv igen.'
  }
}

onMounted(() => void loadDailyExercise())
onSlideEnter(() => void loadDailyExercise())

</script>

<template>
  <main class="welcome-page" aria-live="polite">
    <h1>Velkommen til dagens opgave</h1>
    <p class="intro">Indtast dit bruger-ID. Det bruges, når du sender dit svar.</p>

    <form class="user-id-form" @submit.prevent="submitUserId">
      <label for="student-id" class="field-label">Dit bruger-ID</label>
      <div class="user-id-row">
        <input
          id="student-id"
          v-model="exerciseSession.userId.value"
          class="user-input"
          type="text"
          placeholder="Indtast dit bruger-ID"
          required
          autofocus
          @input="userStatus = 'idle'; userError = null"
        >
        <button
          type="submit"
          :disabled="!exerciseSession.userId.value.trim() || userStatus === 'sending'"
        >
          {{ userStatus === 'sending' ? 'Sender…' : 'Send bruger-ID' }}
        </button>
      </div>
      <p v-if="userError" class="user-error" role="alert">{{ userError }}</p>
    </form>

    <p v-if="dailyLoading && !dailyExercise" class="message">Henter information om dagens opgave…</p>
    <p v-else-if="dailyError && !dailyExercise" class="message error" role="alert">{{ dailyError }}</p>

    <section v-if="dailyExercise" class="overview" aria-label="Information om dagens opgave">
      <div class="overview-number">Opgave {{ dailyExercise.numberOfTheDay }}</div>
      <div>
        <h2>{{ dailyExercise.title }}</h2>
        <p>{{ dailyExercise.description }}</p>
      </div>
    </section>

  </main>
</template>

<style scoped>
.welcome-page {
  width: min(48rem, 86vw);
}

.eyebrow,
.field-label {
  color: #2563eb;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.eyebrow,
h1,
.intro {
  margin: 0;
}

h1 {
  margin-top: 0.25rem;
  font-size: 2.2rem;
}

.intro {
  margin-top: 0.5rem;
  color: #475569;
}

.field-label {
  display: block;
  margin-top: 1.5rem;
  margin-bottom: 0.4rem;
}

.user-id-row {
  display: flex;
  gap: 0.75rem;
  align-items: stretch;
}

.user-input {
  width: min(28rem, 80vw);
  padding: 0.75rem 1rem;
  border: 2px solid #94a3b8;
  border-radius: 0.5rem;
  background: white;
  color: #0f172a;
  font-size: 1.1rem;
  outline: none;
}

.user-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgb(59 130 246 / 20%);
}

button {
  padding: 0.75rem 1.2rem;
  border: 0;
  border-radius: 0.5rem;
  background: #2563eb;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

button:hover:not(:disabled) {
  background: #1d4ed8;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.user-error {
  margin: 0.5rem 0 0;
  color: #dc2626;
  font-size: 0.9rem;
}

.message,
.overview {
  margin-top: 1.5rem;
}

.overview {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.1rem;
  padding: 1.2rem 1.4rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
  background: rgb(255 255 255 / 82%);
  box-shadow: 0 0.5rem 1.5rem rgb(15 23 42 / 10%);
  color: #0f172a;
}

.overview-number {
  height: fit-content;
  padding: 0.4rem 0.7rem;
  border-radius: 999px;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 0.9rem;
  font-weight: 700;
  white-space: nowrap;
}

.overview h2,
.overview p {
  margin: 0;
}

.overview h2 {
  margin-bottom: 0.3rem;
  font-size: 1.3rem;
}

.overview p {
  line-height: 1.5;
}

.overview .overview-question {
  margin-top: 0.65rem;
  color: #334155;
  font-weight: 600;
}

.navigation-hint {
  margin-top: 1.1rem;
  color: #64748b;
  font-size: 0.85rem;
}

.error {
  color: #dc2626;
}
</style>

<script setup lang="ts">
import { onSlideEnter, useNav } from '@slidev/client'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Exercise } from '../models/exercise'
import { answerService } from '../services/answer-service'
import { exerciseService } from '../services/exercise-service'
import { userService } from '../services/user-service'
import { exerciseSession } from '../state/exercise-session'
import ExerciseCompleted from './ExerciseCompleted.vue'

const props = withDefaults(defineProps<{
  completed?: boolean
  exerciseDay?: number
}>(), {
  completed: false,
  exerciseDay: 1,
})

const answer = ref('')
const exercise = ref<Exercise | null>(exerciseSession.exercise.value)
const loading = ref(true)
const loadError = ref<string | null>(null)
const submitStatus = ref<'idle' | 'sending' | 'success' | 'incorrect' | 'error'>('idle')
let pendingExerciseId: string | null = null
let loadRequestId = 0
let userExerciseRequest: Promise<void> | null = null
const { go } = useNav()
const route = useRoute()
const router = useRouter()

if (typeof sessionStorage !== 'undefined' && !exerciseSession.userId.value) {
  exerciseSession.userId.value = sessionStorage.getItem('exercise-user-id') ?? ''
}

if (typeof sessionStorage !== 'undefined' && !exerciseSession.exerciseId.value) {
  exerciseSession.exerciseId.value = sessionStorage.getItem('exercise-id')
}

if (typeof sessionStorage !== 'undefined' && !exercise.value) {
  const storedExercise = sessionStorage.getItem('exercise-data')

  if (storedExercise) {
    try {
      exercise.value = JSON.parse(storedExercise) as Exercise
      exerciseSession.exercise.value = exercise.value
      loading.value = false
    }
    catch (storageError) {
      console.warn('Den gemte opgave kunne ikke læses.', storageError)
    }
  }
}

async function loadExercise(exerciseId: string) {
  if (pendingExerciseId === exerciseId)
    return

  pendingExerciseId = exerciseId
  const requestId = ++loadRequestId
  loading.value = true

  try {
    loadError.value = null
    const loadedExercise = await exerciseService.getById(exerciseId)

    if (requestId === loadRequestId) {
      exercise.value = loadedExercise
      exerciseSession.exercise.value = loadedExercise
    }
  }
  catch (error) {
    console.log(error)
    console.error(error)

    if (requestId === loadRequestId) {
      if (!exercise.value)
        loadError.value = 'Opgaven kunne ikke hentes.'
    }
  }
  finally {
    if (requestId === loadRequestId) {
      pendingExerciseId = null
      loading.value = false
    }
  }
}

async function loadCurrentExercise() {
  if (props.completed) {
    loading.value = false
    return
  }

  if (userExerciseRequest)
    return userExerciseRequest

  const userId = exerciseSession.userId.value.trim()

  if (!userId) {
    loading.value = false
    exercise.value = null
    loadError.value = 'Der mangler et bruger-ID. Gå tilbage og indtast dit bruger-ID.'
    return
  }

  userExerciseRequest = (async () => {
    if (!exerciseSession.exerciseId.value) {
      exercise.value = null
      exerciseSession.exercise.value = null
    }

    loading.value = true
    loadError.value = null

    try {
      const response = await userService.getExerciseForUser(userId, props.exerciseDay)

      if (response.url?.trim()) {
        const completedUrl = getMaterialUrl(response.url.trim())
        exerciseSession.exerciseId.value = null
        exerciseSession.completedUrl.value = completedUrl
        sessionStorage.setItem('exercise-completed-url', completedUrl)
        await go(3)
        return
      }

      const exerciseId = response.exerciseId

      if (!exerciseId)
        throw new Error('API\'et returnerede ikke et exercise-ID.')

      exerciseSession.exerciseId.value = exerciseId
      sessionStorage.setItem('exercise-id', exerciseId)
      await loadExercise(exerciseId)
    }
    catch (error) {
      console.error(error)
      exercise.value = null
      loadError.value = 'Opgaven til bruger-ID’et kunne ikke hentes.'
      loading.value = false
    }
    finally {
      userExerciseRequest = null
    }
  })()

  return userExerciseRequest
}

function getMaterialUrl(url: string): string {
  const parsedUrl = new URL(url, window.location.href)

  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:')
    throw new Error('API\'et returnerede en ugyldig materiale-URL.')

  return parsedUrl.href
}

// A slide can be mounted after Slidev has emitted its enter event. Loading on
// mount as well prevents the page from remaining in its initial loading state.
onMounted(() => void loadCurrentExercise())
onSlideEnter(() => void loadCurrentExercise())

async function submitAnswer() {
  const userId = exerciseSession.userId.value.trim()
  const exerciseId = exerciseSession.exerciseId.value
  const trimmedAnswer = answer.value.trim()

  if (!userId || !exerciseId || !trimmedAnswer || !exercise.value || submitStatus.value === 'sending')
    return

  submitStatus.value = 'sending'

  try {
    const response = await answerService.submit({
      answer: trimmedAnswer,
      userId,
      exerciseId,
    })

    if (response.url?.trim()) {
      const completedUrl = getMaterialUrl(response.url.trim())
      exerciseSession.completedUrl.value = completedUrl

      try {
        sessionStorage.setItem('exercise-completed-url', completedUrl)
      }
      catch (storageError) {
        console.warn('Materiale-URL kunne ikke gemmes i sessionStorage.', storageError)
      }

      answer.value = ''
      await go(3)
      return
    }

    const nextExerciseId = response.exerciseId

    if (!nextExerciseId)
      throw new Error('API\'et returnerede ikke et nyt exercise-ID.')

    if (nextExerciseId.toLowerCase() === exerciseId.toLowerCase()) {
      submitStatus.value = 'incorrect'
      return
    }

    exerciseSession.exerciseId.value = nextExerciseId

    try {
      sessionStorage.setItem('exercise-id', nextExerciseId)
    }
    catch (storageError) {
      console.warn('Exercise-ID kunne ikke gemmes i sessionStorage.', storageError)
    }

    await router.replace({
      name: route.name ?? undefined,
      params: {
        ...route.params,
        exerciseId: nextExerciseId,
      },
    })

    answer.value = ''
    await loadExercise(nextExerciseId)
    submitStatus.value = 'success'
  }
  catch (error) {
    console.error(error)
    submitStatus.value = 'error'
  }
}

</script>

<template>
  <ExerciseCompleted v-if="completed" />

  <main v-else class="exercise-page" aria-live="polite">
    <p v-if="loading && !exercise" class="message">Henter opgaven…</p>
    <p v-else-if="loadError && !exercise" class="message error" role="alert">{{ loadError }}</p>

    <article v-if="exercise" class="exercise-card">
      <div class="exercise-number">Opgave {{ exercise.numberOfTheDay }}</div>

      <h1>{{ exercise.title }}</h1>
      <p class="description">{{ exercise.description }}</p>

      <section class="question">
        <h2>Spørgsmål</h2>
        <p>{{ exercise.question }}</p>
      </section>

      <p v-if="!exerciseSession.userId.value.trim()" class="missing-id" role="alert">
        Indtast dit bruger-ID på velkomstsiden, før du sender et svar.
      </p>

      <form class="answer-form" @submit.prevent="submitAnswer">
        <label for="exercise-answer">Dit svar</label>
        <div class="answer-row">
          <input
            id="exercise-answer"
            v-model="answer"
            type="text"
            placeholder="Skriv dit svar"
            required
            @input="submitStatus = 'idle'"
          >
          <button
            type="submit"
            :disabled="!exerciseSession.userId.value.trim() || !exerciseSession.exerciseId.value || !answer.trim() || submitStatus === 'sending'"
          >
            {{ submitStatus === 'sending' ? 'Sender…' : 'Send svar' }}
          </button>
        </div>
      </form>

      <p v-if="submitStatus === 'success'" class="status success" role="status">Dit svar er sendt ✓</p>
      <p v-else-if="submitStatus === 'incorrect'" class="status incorrect" role="alert">
        Dit svar er desværre ikke korrekt. Prøv igen.
      </p>
      <p v-else-if="submitStatus === 'error'" class="status error" role="alert">
        Svaret kunne ikke sendes. Prøv igen.
      </p>
    </article>
  </main>
</template>

<style scoped>
.exercise-page {
  width: min(52rem, 86vw);
}

.exercise-card {
  padding: 1.7rem 1.9rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.85rem;
  background: rgb(255 255 255 / 85%);
  box-shadow: 0 0.75rem 2rem rgb(15 23 42 / 12%);
  color: #0f172a;
}

.exercise-number {
  display: inline-block;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 0.9rem;
  font-weight: 700;
}

h1 {
  margin: 0.7rem 0 0.3rem;
  font-size: 2rem;
}

.description,
.question p,
.status {
  margin: 0;
  line-height: 1.5;
}

.description {
  color: #475569;
}

.question {
  margin-top: 1.2rem;
  padding: 1rem 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}

.question h2,
.answer-form label {
  display: block;
  margin: 0 0 0.4rem;
  color: #475569;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.question p {
  font-size: 1.15rem;
  font-weight: 600;
}

.answer-form {
  margin-top: 1.1rem;
}

.answer-row {
  display: flex;
  gap: 0.75rem;
}

input {
  min-width: 0;
  flex: 1;
  padding: 0.75rem 0.9rem;
  border: 2px solid #94a3b8;
  border-radius: 0.5rem;
  background: white;
  color: #0f172a;
  font-size: 1rem;
  outline: none;
}

input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgb(59 130 246 / 20%);
}

button {
  padding: 0.75rem 1.25rem;
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

.missing-id,
.status {
  margin-top: 0.75rem;
}

.missing-id {
  color: #b45309;
  font-size: 0.9rem;
}

.success {
  color: #15803d;
}

.incorrect {
  color: #b45309;
  font-weight: 600;
}

.error {
  color: #dc2626;
}
</style>

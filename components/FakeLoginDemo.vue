<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  endpoint?: string
}>(), {
  endpoint: 'http://localhost:5000/unsafe/users',
})

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const submitStatus = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

async function submit() {
  if (!username.value.trim() || !password.value || submitStatus.value === 'sending')
    return

  submitStatus.value = 'sending'

  try {
    const response = await fetch(props.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value.trim(),
        password: password.value,
      }),
    })

    if (!response.ok)
      throw new Error(`Endpointet svarede med status ${response.status}`)

    submitStatus.value = 'sent'
  }
  catch (error) {
    console.error('Kunne ikke sende demoformularen.', error)
    submitStatus.value = 'error'
  }
}
</script>

<template>
  <main class="fake-login-page">
    <section class="fake-login-card" aria-labelledby="fake-login-title">
      <div class="fake-brand">
        <span class="fake-brand-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32">
            <path d="M7 13.5V10a9 9 0 0 1 18 0v3.5" />
            <rect x="4" y="13" width="24" height="16" rx="5" />
            <circle cx="16" cy="21" r="2" />
          </svg>
        </span>
        <span>Portalen</span>
      </div>

      <p class="fake-eyebrow">Velkommen tilbage</p>
      <h1 id="fake-login-title">Log ind på din konto</h1>
      <p class="fake-intro">Indtast dit brugernavn og din adgangskode for at fortsætte.</p>

      <form @submit.prevent="submit">
        <label for="fake-username">Brugernavn</label>
        <input
          id="fake-username"
          v-model="username"
          type="text"
          autocomplete="username"
          placeholder="Dit brugernavn"
          required
          @input="submitStatus = 'idle'"
        >

        <label for="fake-password">Adgangskode</label>
        <div class="fake-password-wrap">
          <input
            id="fake-password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="off"
            placeholder="Indtast din adgangskode"
            required
            @input="submitStatus = 'idle'"
          >
          <button
            class="fake-show-password"
            type="button"
            :aria-pressed="showPassword"
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? 'Skjul' : 'Vis' }}
          </button>
        </div>

        <button class="fake-submit" type="submit" :disabled="submitStatus === 'sending'">
          {{ submitStatus === 'sending' ? 'Sender…' : 'Log ind' }}
        </button>

        <p v-if="submitStatus === 'sent'" class="fake-status fake-success" role="status">
          Oplysningerne blev sendt.
        </p>
        <p v-else-if="submitStatus === 'error'" class="fake-status fake-error" role="alert">
          Oplysningerne kunne ikke sendes. Prøv igen.
        </p>
      </form>

      <p class="fake-support">Har du brug for hjælp? <a href="#" @click.prevent>Kontakt support</a></p>
    </section>
  </main>
</template>

<style scoped>
.fake-login-page {
  display: grid;
  width: 100%;
  min-height: 100%;
  color: #152238;
  place-items: center;
}

.fake-login-card {
  width: 22rem;
  padding: 1.5rem 1.8rem;
  border: 1px solid rgb(173 187 205 / 70%);
  border-radius: 0.9rem;
  background: rgb(255 255 255 / 94%);
  box-shadow: 0 1rem 3rem rgb(34 56 84 / 15%);
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
}

.fake-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.15rem;
  font-size: 0.9rem;
  font-weight: 750;
}

.fake-brand-mark {
  display: grid;
  width: 1.7rem;
  height: 1.7rem;
  color: white;
  border-radius: 0.45rem;
  background: linear-gradient(145deg, #156be8, #084aa8);
  place-items: center;
}

.fake-brand-mark svg {
  width: 1rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2.1;
}

.fake-eyebrow {
  margin: 0 0 0.2rem;
  color: #1263cf;
  font-size: 0.55rem;
  font-weight: 750;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  color: #132039;
  font-size: 1.35rem;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

.fake-intro {
  margin: 0.35rem 0 1rem;
  color: #607089;
  font-size: 0.65rem;
}

form > label {
  display: block;
  color: #27364d;
  font-size: 0.6rem;
  font-weight: 680;
}

form > label:not(:first-child) {
  margin-top: 0.7rem;
}

.fake-support a {
  color: #0c62cf;
  text-decoration: none;
}

input[type="password"],
input[type="text"] {
  width: 100%;
  height: 2.2rem;
  margin-top: 0.3rem;
  padding: 0 0.65rem;
  color: #17233a;
  border: 1px solid #cbd5e2;
  border-radius: 0.45rem;
  outline: none;
  background: #fbfcfe;
  font-size: 0.65rem;
}

input:focus {
  border-color: #176bd7;
  box-shadow: 0 0 0 0.15rem rgb(23 107 215 / 11%);
}

.fake-password-wrap {
  position: relative;
}

.fake-password-wrap input {
  padding-right: 2.8rem;
}

.fake-show-password {
  position: absolute;
  top: 0.66rem;
  right: 0.42rem;
  padding: 0.2rem;
  color: #3c5b82;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 0.55rem;
  font-weight: 700;
}

.fake-submit {
  margin-top: 0.85rem;
  width: 100%;
  height: 2.25rem;
  color: white;
  border: 0;
  border-radius: 0.45rem;
  background: linear-gradient(135deg, #176ddb, #0956b7);
  box-shadow: 0 0.45rem 1rem rgb(14 91 191 / 22%);
  cursor: pointer;
  font-size: 0.65rem;
  font-weight: 720;
}

.fake-submit:hover:not(:disabled) {
  filter: brightness(1.06);
}

.fake-submit:disabled {
  cursor: wait;
  opacity: 0.65;
}

.fake-status {
  margin: 0.55rem 0 0;
  padding: 0.35rem;
  border-radius: 0.35rem;
  font-size: 0.55rem;
  text-align: center;
}

.fake-success {
  color: #12623e;
  background: #eaf8f0;
}

.fake-error {
  color: #9a2930;
  background: #fff0f1;
}

.fake-support {
  margin: 0.85rem 0 0;
  padding-top: 0.75rem;
  color: #69778d;
  border-top: 1px solid #e7ebf0;
  font-size: 0.55rem;
  text-align: center;
}
</style>

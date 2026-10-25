import { ref } from 'vue'
import type { Exercise } from '../models/exercise'

// Delt state mellem velkomst- og opgavesiden.
export const exerciseSession = {
  userId: ref(''),
  exerciseId: ref<string | null>(null),
  exercise: ref<Exercise | null>(null),
  completedUrl: ref<string | null>(null),
}

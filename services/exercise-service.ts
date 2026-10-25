import type { Exercise } from '../models/exercise'
import { get } from './api-client'

export const exerciseService = {
  getForDay(exerciseDay: number): Promise<Exercise> {
    return get<Exercise>(`/api/exercises/GetExercisesForTheDay/${exerciseDay}`)
  },

  getById(exerciseId: string): Promise<Exercise> {
    return get<Exercise>(`/api/exercises/${encodeURIComponent(exerciseId)}`)
  },
}

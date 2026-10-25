import type { AnswerResponse } from '../models/answer'
import { get } from './api-client'

export const userService = {
  getExerciseForUser(userId: string, exerciseDay: number): Promise<AnswerResponse> {
    const encodedUserId = encodeURIComponent(userId)
    const query = new URLSearchParams({
      exerciseDay: exerciseDay.toString(),
    })
    
    return get<AnswerResponse>(
      `/api/users/GetExerciseForUser/${encodedUserId}?${query.toString()}`,
    )
  },
}

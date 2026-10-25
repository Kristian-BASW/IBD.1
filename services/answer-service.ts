import type { AnswerRequest, AnswerResponse } from '../models/answer'
import { post } from './api-client'

export const answerService = {
  submit(answer: AnswerRequest): Promise<AnswerResponse> {
    return post<AnswerResponse, AnswerRequest>('/answerForExercise', answer)
  },
}

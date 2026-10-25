export interface AnswerRequest {
  answer: string
  userId: string
  exerciseId: string
}

export interface AnswerResponse {
  exerciseId: string
  url: string | null
}

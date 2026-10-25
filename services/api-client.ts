const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5072'
const API_BASE_URL = (
  /^https?:\/\//i.test(configuredApiBaseUrl)
    ? configuredApiBaseUrl
    : `https://${configuredApiBaseUrl}`
).replace(/\/$/, '')
const REQUEST_TIMEOUT_MS = 15_000

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  let response: Response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      signal: controller.signal,
    })
  }
  finally {
    clearTimeout(timeout)
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `API request failed with status ${response.status}`,
    )
  }

  const responseBody = await response.text()

  if (!responseBody)
    return undefined as T

  return JSON.parse(responseBody) as T
}

export function get<T>(path: string): Promise<T> {
  return request<T>(path)
}

export function post<TResponse, TBody>(
  path: string,
  body: TBody,
): Promise<TResponse> {
  return request<TResponse>(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

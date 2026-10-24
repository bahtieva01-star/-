import { mockGetTickets, mockCreateTicket } from './mockTickets.js'

// true — используем mock, false — отправляем настоящие HTTP-запросы
const USE_MOCK = true

const baseUrl = import.meta.env.VITE_API_BASE_URL

export async function getTickets() {
  if (USE_MOCK) {
    const result = await mockGetTickets()

    if (!result.ok) {
      throw new Error(result.data?.message || `Ошибка ${result.status}`)
    }

    return result.data
  }

  const response = await fetch(`${baseUrl}/api/downtime-requests`)

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  return await response.json()
}

export async function createTicket(body) {
  if (USE_MOCK) {
    const result = await mockCreateTicket(body)

    if (!result.ok) {
      const error = new Error(
        result.data?.message || `Ошибка ${result.status}`,
      )
      error.status = result.status
      throw error
    }

    return result.data
  }

  const response = await fetch(`${baseUrl}/api/downtime-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}`)
    error.status = response.status
    throw error
  }

  return await response.json()
}
import { fetchWrapper } from '@/utils/fetcher/fetchWrapper'

interface CreateActivityTypeRequest {
  name: string
  description: string
  points: number
}

interface CreateActivityTypeResponse {
  id: string
  name: string
  description: string
  points: number
  created_at: string
  updated_at: string
}

export async function createActivityType(data: CreateActivityTypeRequest) {
  await fetchWrapper<CreateActivityTypeResponse>('/activities/activity-type', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer token',
    },
    body: JSON.stringify(data),
  })
}

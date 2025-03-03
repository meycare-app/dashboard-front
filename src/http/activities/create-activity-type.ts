import { api } from '@/utils/fetcher/fetchWrapper'
import { revalidateTag } from 'next/cache'

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
  const response = await api
    .post<CreateActivityTypeResponse>('activities/activity-type', {
      json: data,
    })
    .json()

  revalidateTag('pointsTableData')

  return response
}

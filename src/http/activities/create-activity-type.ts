import { fetchWrapper } from '@/utils/fetcher/fetchWrapper'
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
  const response = await fetchWrapper<CreateActivityTypeResponse>(
    '/activities/activity-type',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZDUxYzk4Yi1kZDgzLTQ4NDYtOGIxNS01OWNkNzFhMjlkYTAiLCJpYXQiOjE3Mzc5MjA2ODksImV4cCI6MTczNzkzNTA4OX0.mNrLNVHOlXc8QPyIdO1VMZ81l7ot2OhOnq2TSCoyYeM`,
      },
      body: JSON.stringify(data),
    },
  )

  revalidateTag('pointsTableData')

  return response
}

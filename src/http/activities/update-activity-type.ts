import { fetchWrapper } from '@/utils/fetcher/fetchWrapper'
import { revalidateTag } from 'next/cache'

interface UpdateActivityTypeRequest {
  name: string
  points: number
  activityTypeId: string
}

interface UpdateActivityTypeResponse {
  id: string
  name: string
  description: string
  points: number
  created_at: string
  updated_at: string
  message?: string
}

export async function updateActivityType({
  name,
  points,
  activityTypeId,
}: UpdateActivityTypeRequest) {
  const response = await fetchWrapper<UpdateActivityTypeResponse>(
    `/activities/activity-type/${activityTypeId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZDUxYzk4Yi1kZDgzLTQ4NDYtOGIxNS01OWNkNzFhMjlkYTAiLCJpYXQiOjE3Mzc5MjA2ODksImV4cCI6MTczNzkzNTA4OX0.mNrLNVHOlXc8QPyIdO1VMZ81l7ot2OhOnq2TSCoyYeM`,
      },
      body: JSON.stringify({ name, points }),
    },
  )

  revalidateTag('pointsTableData')

  return response
}

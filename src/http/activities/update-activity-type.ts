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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NmU1NDEyMC00YTk5LTQxMmMtODUxMy05YzFlM2I4MDkzNzMiLCJpYXQiOjE3MzkyMzE4MDAsImV4cCI6MTczOTI0NjIwMH0.A8dj9wTOj77pIDGJDxjomZKIm1ZUv6LHzO225339zLA`,
      },
      body: JSON.stringify({ name, points }),
    },
  )

  revalidateTag('pointsTableData')

  return response
}

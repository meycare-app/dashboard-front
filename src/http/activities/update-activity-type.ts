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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjVjNzUzNC00ZjBmLTQwODYtYmQyOS1kYTQwZWUyMDMxNjQiLCJpYXQiOjE3MzM1MzM4NTIsImV4cCI6MTczMzU0ODI1Mn0.1zmmjEzsFtmbbZl4T-HDYdIOURSZ0jfI1SoxLN7X2Kk`,
      },
      body: JSON.stringify({ name, points }),
    },
  )

  revalidateTag('pointsTableData')

  return response
}

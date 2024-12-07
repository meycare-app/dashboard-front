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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjVjNzUzNC00ZjBmLTQwODYtYmQyOS1kYTQwZWUyMDMxNjQiLCJpYXQiOjE3MzM1MzM4NTIsImV4cCI6MTczMzU0ODI1Mn0.1zmmjEzsFtmbbZl4T-HDYdIOURSZ0jfI1SoxLN7X2Kk`,
    },
    body: JSON.stringify(data),
  })
}

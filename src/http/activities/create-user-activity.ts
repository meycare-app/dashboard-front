import { fetchWrapper } from '@/utils/fetcher/fetchWrapper'
import { revalidateTag } from 'next/cache'

interface CreateUserActivityRequest {
  userId: string
  activityTypeId: string
}

interface CreateUserActivityResponse {
  id: string
  points: number
  activity_type_id: string
  activity_data: {
    admin_id: string
  }
  created_at: string
  updated_at: string
  userId: string
}

export async function createUserActivity(data: CreateUserActivityRequest) {
  const response = await fetchWrapper<CreateUserActivityResponse>(
    '/activities',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZDUxYzk4Yi1kZDgzLTQ4NDYtOGIxNS01OWNkNzFhMjlkYTAiLCJpYXQiOjE3Mzc5MjA2ODksImV4cCI6MTczNzkzNTA4OX0.mNrLNVHOlXc8QPyIdO1VMZ81l7ot2OhOnq2TSCoyYeM`,
      },
    },
  )

  revalidateTag('getCommonUserInfo')

  return response
}

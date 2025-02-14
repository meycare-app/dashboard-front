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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NmU1NDEyMC00YTk5LTQxMmMtODUxMy05YzFlM2I4MDkzNzMiLCJpYXQiOjE3MzkyMzE4MDAsImV4cCI6MTczOTI0NjIwMH0.A8dj9wTOj77pIDGJDxjomZKIm1ZUv6LHzO225339zLA`,
      },
    },
  )

  revalidateTag('getCommonUserInfo')

  return response
}

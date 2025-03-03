import { api } from '@/utils/fetcher/fetchWrapper'
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
  const response = await api
    .post<CreateUserActivityResponse>('activities', {
      json: data,
    })
    .json()

  revalidateTag('getCommonUserInfo')

  return response
}

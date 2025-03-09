'use server'

import { api } from '@/utils/fetcher/fetchWrapper'
import { revalidateTag } from 'next/cache'

interface DeleteActivityRequest {
  id: string
  activityId: string
}

export async function deleteActivity({
  id,
  activityId,
}: DeleteActivityRequest) {
  const response = await api.delete(`activities/${activityId}/${id}`).json()

  revalidateTag('getCommonUserInfo')

  return response
}

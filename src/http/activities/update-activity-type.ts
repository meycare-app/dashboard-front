'use server'

import { api } from '@/utils/fetcher/fetchWrapper'
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
  const response = await api
    .put<UpdateActivityTypeResponse>(
      `activities/activity-type/${activityTypeId}`,
      {
        json: { name, points },
      },
    )
    .json()

  revalidateTag('pointsTableData')

  return response
}

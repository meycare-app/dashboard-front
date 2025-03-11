'use server'

import { api } from '@/utils/fetcher/fetchWrapper'

interface PointsTableData {
  id: string
  name: string
  description: string
  points: number
  created_at: string
  updated_at: string
}

interface ActivityTypeRequest {
  url: string
}

interface ActivityTypeResponse {
  results: PointsTableData[]
  total: number
  init: number
  limit: number
}

export async function getActivitiesType({ url }: ActivityTypeRequest) {
  const pointsTableData = await api
    .get<ActivityTypeResponse>(url, {
      next: { tags: ['pointsTableData'] },
    })
    .json()

  return pointsTableData
}

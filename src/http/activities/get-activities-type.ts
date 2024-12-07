import { fetchWrapper } from '@/utils/fetcher/fetchWrapper'

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
  const pointsTableData = await fetchWrapper<ActivityTypeResponse>(url, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjVjNzUzNC00ZjBmLTQwODYtYmQyOS1kYTQwZWUyMDMxNjQiLCJpYXQiOjE3MzM1MzM4NTIsImV4cCI6MTczMzU0ODI1Mn0.1zmmjEzsFtmbbZl4T-HDYdIOURSZ0jfI1SoxLN7X2Kk`,
    },
    next: { tags: ['pointsTableData'] },
  })

  return pointsTableData
}

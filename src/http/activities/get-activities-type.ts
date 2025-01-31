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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZDUxYzk4Yi1kZDgzLTQ4NDYtOGIxNS01OWNkNzFhMjlkYTAiLCJpYXQiOjE3Mzc5MjA2ODksImV4cCI6MTczNzkzNTA4OX0.mNrLNVHOlXc8QPyIdO1VMZ81l7ot2OhOnq2TSCoyYeM`,
    },
    next: { tags: ['pointsTableData'] },
  })

  return pointsTableData
}

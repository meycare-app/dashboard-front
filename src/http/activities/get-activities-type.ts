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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NmU1NDEyMC00YTk5LTQxMmMtODUxMy05YzFlM2I4MDkzNzMiLCJpYXQiOjE3MzkyMzE4MDAsImV4cCI6MTczOTI0NjIwMH0.A8dj9wTOj77pIDGJDxjomZKIm1ZUv6LHzO225339zLA`,
    },
    next: { tags: ['pointsTableData'] },
  })

  return pointsTableData
}

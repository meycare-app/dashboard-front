import { fetchWrapper } from '@/utils/fetcher/fetchWrapper'

interface CommonUsersRequest {
  url: string
}

interface CommonUserData {
  id: string
  name: string
  phone: string
  indicated: boolean
  points: number
}

interface CommonUsersResponse {
  results: CommonUserData[]
  total: number
  init: number
  limit: number
}

export async function getCommonUsers({ url }: CommonUsersRequest) {
  const commonUsersData = await fetchWrapper<CommonUsersResponse>(url, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjVjNzUzNC00ZjBmLTQwODYtYmQyOS1kYTQwZWUyMDMxNjQiLCJpYXQiOjE3MzM1MzM4NTIsImV4cCI6MTczMzU0ODI1Mn0.1zmmjEzsFtmbbZl4T-HDYdIOURSZ0jfI1SoxLN7X2Kk`,
    },
    next: { tags: ['commonUsers'] },
  })

  return commonUsersData
}

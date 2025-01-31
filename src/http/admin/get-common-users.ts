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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZDUxYzk4Yi1kZDgzLTQ4NDYtOGIxNS01OWNkNzFhMjlkYTAiLCJpYXQiOjE3Mzc5MjA2ODksImV4cCI6MTczNzkzNTA4OX0.mNrLNVHOlXc8QPyIdO1VMZ81l7ot2OhOnq2TSCoyYeM`,
    },
    next: { tags: ['commonUsers'] },
  })

  return commonUsersData
}

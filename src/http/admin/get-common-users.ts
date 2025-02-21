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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NmU1NDEyMC00YTk5LTQxMmMtODUxMy05YzFlM2I4MDkzNzMiLCJpYXQiOjE3MzkyMzE4MDAsImV4cCI6MTczOTI0NjIwMH0.A8dj9wTOj77pIDGJDxjomZKIm1ZUv6LHzO225339zLA`,
    },
    next: { tags: ['commonUsers'] },
  })

  return commonUsersData
}

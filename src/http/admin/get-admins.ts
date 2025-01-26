import { AdminData } from '@/app/adminControl/types'
import { fetchWrapper } from '@/utils/fetcher/fetchWrapper'

export interface GetAdminsRequest {
  url: string
}

export interface GetAdminsResponse {
  results: AdminData[]
  total: number
  init: number
  limit: number
}

export async function getAdmins({ url }: GetAdminsRequest) {
  const response = await fetchWrapper<GetAdminsResponse>(`/admin/${url}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZDUxYzk4Yi1kZDgzLTQ4NDYtOGIxNS01OWNkNzFhMjlkYTAiLCJpYXQiOjE3Mzc5MjA2ODksImV4cCI6MTczNzkzNTA4OX0.mNrLNVHOlXc8QPyIdO1VMZ81l7ot2OhOnq2TSCoyYeM`,
    },
    next: { tags: ['getAdmins'] },
  })

  return response
}

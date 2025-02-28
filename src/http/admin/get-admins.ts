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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NmU1NDEyMC00YTk5LTQxMmMtODUxMy05YzFlM2I4MDkzNzMiLCJpYXQiOjE3MzkyMzE4MDAsImV4cCI6MTczOTI0NjIwMH0.A8dj9wTOj77pIDGJDxjomZKIm1ZUv6LHzO225339zLA`,
    },
    next: { tags: ['getAdmins'] },
  })

  return response
}

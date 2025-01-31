import { fetchWrapper } from '@/utils/fetcher/fetchWrapper'
import { revalidateTag } from 'next/cache'

interface ReactivateAdminRequest {
  adminId: string
}

interface ReactivateAdminResponse {
  message: string
}

export async function reactivateAdmin({ adminId }: ReactivateAdminRequest) {
  const response = await fetchWrapper<ReactivateAdminResponse>(
    '/admin/reactivate',
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZDUxYzk4Yi1kZDgzLTQ4NDYtOGIxNS01OWNkNzFhMjlkYTAiLCJpYXQiOjE3Mzc5MjA2ODksImV4cCI6MTczNzkzNTA4OX0.mNrLNVHOlXc8QPyIdO1VMZ81l7ot2OhOnq2TSCoyYeM',
      },
      body: JSON.stringify({ adminId }),
    },
  )

  revalidateTag('getAdmins')

  return response
}

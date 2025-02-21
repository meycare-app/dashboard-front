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
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NmU1NDEyMC00YTk5LTQxMmMtODUxMy05YzFlM2I4MDkzNzMiLCJpYXQiOjE3MzkyMzE4MDAsImV4cCI6MTczOTI0NjIwMH0.A8dj9wTOj77pIDGJDxjomZKIm1ZUv6LHzO225339zLA',
      },
      body: JSON.stringify({ adminId }),
    },
  )

  revalidateTag('getAdmins')

  return response
}

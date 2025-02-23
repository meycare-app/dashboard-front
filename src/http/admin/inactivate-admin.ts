import { fetchWrapper } from '@/utils/fetcher/fetchWrapper'
import { revalidateTag } from 'next/cache'

interface InactivateAdminRequest {
  adminId: string
}

interface InactivateAdminResponse {
  message: string
  deletedAt?: string
}

export async function inactivateAdmin({ adminId }: InactivateAdminRequest) {
  const response = await fetchWrapper<InactivateAdminResponse>(
    '/admin/inactivate',
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

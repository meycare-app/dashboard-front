import { fetchWrapper } from '@/utils/fetcher/fetchWrapper'
import { revalidateTag } from 'next/cache'

interface DeleteActivityRequest {
  id: string
  activityId: string
}

export async function deleteActivity({
  id,
  activityId,
}: DeleteActivityRequest) {
  const response = await fetchWrapper(`/activities/${activityId}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NmU1NDEyMC00YTk5LTQxMmMtODUxMy05YzFlM2I4MDkzNzMiLCJpYXQiOjE3MzkyMzE4MDAsImV4cCI6MTczOTI0NjIwMH0.A8dj9wTOj77pIDGJDxjomZKIm1ZUv6LHzO225339zLA`,
    },
  })

  revalidateTag('getCommonUserInfo')

  return response
}

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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZDUxYzk4Yi1kZDgzLTQ4NDYtOGIxNS01OWNkNzFhMjlkYTAiLCJpYXQiOjE3Mzc5MjA2ODksImV4cCI6MTczNzkzNTA4OX0.mNrLNVHOlXc8QPyIdO1VMZ81l7ot2OhOnq2TSCoyYeM`,
    },
  })

  revalidateTag('getCommonUserInfo')

  return response
}

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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjVjNzUzNC00ZjBmLTQwODYtYmQyOS1kYTQwZWUyMDMxNjQiLCJpYXQiOjE3MzM1MzM4NTIsImV4cCI6MTczMzU0ODI1Mn0.1zmmjEzsFtmbbZl4T-HDYdIOURSZ0jfI1SoxLN7X2Kk`,
    },
  })

  revalidateTag('getCommonUserInfo')

  return response
}

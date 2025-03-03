import { api } from '@/utils/fetcher/fetchWrapper'

interface getAdminProfileResponse {
  id: string
  name: string
  email: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export async function getAdminProfile() {
  const profileData = await api
    .get<getAdminProfileResponse>('admin/profile')
    .json()

  return profileData
}

import { fetchWrapper } from '@/utils/fetcher/fetchWrapper'

interface getAdminProfileResponse {
  id: string
  name: string
  email: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export async function getAdminProfile() {
  const profileData = await fetchWrapper<getAdminProfileResponse>(
    '/admin/profile',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NGEwZThhOS1kZjMxLTQwOWMtYmM1Zi1jZTFiNzA3YWMxNzMiLCJpYXQiOjE3NDAxODQ3ODIsImV4cCI6MTc0MDE5OTE4Mn0.MCHluVUd91yv0IT0FIr2sN_nk5xTRn5smzEYEexGNhw`,
      },
    },
  )

  return profileData
}

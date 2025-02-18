import { fetchWrapper } from '@/utils/fetcher/fetchWrapper'

interface UpdateAdminNameRequest {
  adminId: string
  name: string
}

type UpdateAdminNameResponse =
  | {
      id: string
      name: string
      email: string
      role: string
      createdAt: string
      updatedAt: string
      is_verified: boolean
    }
  | { message: string }

export async function updateAdminName({
  name,
  adminId,
}: UpdateAdminNameRequest) {
  const response = await fetchWrapper<UpdateAdminNameResponse>(
    '/master/profile',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NGEwZThhOS1kZjMxLTQwOWMtYmM1Zi1jZTFiNzA3YWMxNzMiLCJpYXQiOjE3Mzk5MTczNjYsImV4cCI6MTczOTkzMTc2Nn0.cyTe0zLcrl4TnnMSBE-5PxJWB7lk6bp54zs0eN6C--A',
      },
      body: JSON.stringify({ name, adminId }),
    },
  )

  return response
}

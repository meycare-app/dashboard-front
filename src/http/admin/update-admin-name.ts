'use server'

import { api } from '@/utils/fetcher/fetchWrapper'

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
  const response = await api
    .put<UpdateAdminNameResponse>('master/profile', {
      json: { name, adminId },
    })
    .json()

  return response
}

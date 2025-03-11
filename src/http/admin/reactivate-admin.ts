'use server'

import { api } from '@/utils/fetcher/fetchWrapper'
import { revalidateTag } from 'next/cache'

interface ReactivateAdminRequest {
  adminId: string
}

interface ReactivateAdminResponse {
  message: string
}

export async function reactivateAdmin({ adminId }: ReactivateAdminRequest) {
  const response = await api
    .patch<ReactivateAdminResponse>('admin/reactivate', {
      json: { adminId },
    })
    .json()

  revalidateTag('getAdmins')

  return response
}

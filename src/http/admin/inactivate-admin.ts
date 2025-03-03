import { api } from '@/utils/fetcher/fetchWrapper'
import { revalidateTag } from 'next/cache'

interface InactivateAdminRequest {
  adminId: string
}

interface InactivateAdminResponse {
  message: string
  deletedAt?: string
}

export async function inactivateAdmin({ adminId }: InactivateAdminRequest) {
  const response = await api
    .patch<InactivateAdminResponse>('admin/inactivate', {
      json: { adminId },
    })
    .json()

  revalidateTag('getAdmins')

  return response
}

'use server'

import { AdminData } from '@/app/adminControl/types'
import { api } from '@/utils/fetcher/fetchWrapper'

export interface GetAdminsRequest {
  url: string
}

export interface GetAdminsResponse {
  results: AdminData[]
  total: number
  init: number
  limit: number
}

export async function getAdmins({ url }: GetAdminsRequest) {
  const response = await api
    .get<GetAdminsResponse>(`admin/${url}`, {
      next: { tags: ['getAdmins'] },
    })
    .json()

  return response
}

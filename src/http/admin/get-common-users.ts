import { api } from '@/utils/fetcher/fetchWrapper'

interface CommonUsersRequest {
  url: string
}

interface CommonUserData {
  id: string
  name: string
  phone: string
  indicated: boolean
  points: number
}

interface CommonUsersResponse {
  results: CommonUserData[]
  total: number
  init: number
  limit: number
}

export async function getCommonUsers({ url }: CommonUsersRequest) {
  const commonUsersData = await api
    .get<CommonUsersResponse>(url, {
      next: { tags: ['commonUsers'] },
    })
    .json()

  return commonUsersData
}

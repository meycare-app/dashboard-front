import { fetchWrapper } from '@/utils/fetcher/fetchWrapper'

interface Activities {
  id: string
  points: number
  activity_data: {
    price: number
    street: string | null
    zip_code: string | null
    complement: string | null
    freightTax: number
    product_id: string
    neighborhood: string
    points_price: number
    product_name: string
  }
  created_at: string
  updated_at: string
  userId: string
  activity_type_id: string
}

interface Addresses {
  id: string
  zip_code: string
  street: string
  complement: string
  neighborhood: string
  lastUsedAt: string
  userId: string
}

interface CommonUserResponse {
  id: string
  name: string
  email: string
  phone: string
  image: string | null
  points: number
  is_verified: boolean
  created_at: string
  updated_at: string
  address_zipCode: string | null
  address_street: string | null
  address_complement: string | null
  address_neighborhood: string | null
  customer_id: string
  indicated_by_id: string | null
  indicated_by_name: string | null
  activities: Activities[]
  addresses: Addresses[]
}

export async function getCommonUserInfo({ id }: { id: string }) {
  const commonUserInfo = await fetchWrapper<CommonUserResponse>(
    `/admin/users/${id}`,
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjVjNzUzNC00ZjBmLTQwODYtYmQyOS1kYTQwZWUyMDMxNjQiLCJpYXQiOjE3MzM1MzM4NTIsImV4cCI6MTczMzU0ODI1Mn0.1zmmjEzsFtmbbZl4T-HDYdIOURSZ0jfI1SoxLN7X2Kk`,
      },
      next: { tags: ['getCommonUserInfo'] },
    },
  )

  return commonUserInfo
}

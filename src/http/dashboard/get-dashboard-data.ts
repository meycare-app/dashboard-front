'use server'

import { api } from '@/utils/fetcher/fetchWrapper'

interface ActivityCount {
  totalPointsGiven: number
  totalPointsSpent: number
  totalPointsGivenIncreasePercentage: number
  totalPointsSpentIncreasePercentage: number
}

interface UserCount {
  totalUsers: number
  newUsers: number
  active: number
  totalUsersIncreasePercentage: number
  newUsersIncreasePercentage: number
  activeIncreasePercentage: number
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  image: string
  points: number
  created_at: string
  updated_at: string
  stripe_product_id: string
  weight: number
  height: number
  width: number
  length: number
}

interface PurchaseCount {
  newTotalSales: number
  totalSalesIncreasePercentage: number
  mostSoldProductWithPoints: Product | null
  mostSoldProductWithCash: Product | null
  mostSoldProductWithPointsQuantity: number
  mostSoldProductsWithPointsIncreasePercentage: number
  mostSoldProductWithCashQuantity: number
  mostSoldProductsWithCashIncreasePercentage: number
}

interface GetDashboardDataResponse {
  activity_count: ActivityCount
  user_count: UserCount
  purchase_count: PurchaseCount
}

export async function getDashboardData(url: string = 'admin/dashboard') {
  const dashboardData = await api.get(url).json<GetDashboardDataResponse>()

  return dashboardData
}

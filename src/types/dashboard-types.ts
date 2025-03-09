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

export interface DashboardDataType {
  activity_count: ActivityCount
  user_count: UserCount
  purchase_count: PurchaseCount
}

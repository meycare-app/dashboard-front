type PurchaseItem = {
  id: string
  product_id: string
  purchase_id: string
  quantity: number
  price: number
  created_at: string
  updated_at: string
}

export type Purchase = {
  id: string
  user_id: string
  complement: string
  neighborhood: string
  street: string
  zip_code: string
  freight_amount: number
  is_using_points: boolean
  points_price: number
  total_amount: number
  status: 'COMPLETED' | 'PENDING' | 'CANCELED'
  stripe_payment_id: string | null
  created_at: string
  updated_at: string
  date: string
  purchase_items: PurchaseItem[]
}

export type HistorySellsProps = {
  data: Purchase[]
}

export type UserType = {
  id: string
  name: string
  email: string
  phone: string
  image: string
  createdAt: string
  updatedAt: string
  total_score: number
  is_verified: boolean
  product: string
  value: number
  saleDate: string
  client: string
  address: string
}

export type HistorySellsProps = {
  data: UserType[]
}

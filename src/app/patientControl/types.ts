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
}

export type PatientsTableProps = {
  data: UserType[]
}

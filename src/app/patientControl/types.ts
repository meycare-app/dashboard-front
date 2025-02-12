export interface GetCommonsUsersTableProps {
  page: number
  rowsPerPage: number
  globalFilter?: string
  indicated?: boolean | null
}

export interface CommonUserData {
  id: string
  name: string
  phone: string
  indicated: boolean
  points: number
}

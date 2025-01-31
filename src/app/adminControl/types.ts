export interface GetAdminsTableProps {
  page: number
  rowsPerPage: number
  globalFilter?: string
  active?: boolean | null
}

export interface AdminData {
  id: string
  name: string
  email: string
  active: boolean
}

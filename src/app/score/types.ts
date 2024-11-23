export interface RowDataType {
  id: string
  name: string
  description: string
  points: number
  created_at: string
  updated_at: string
}

export interface PointsTableData {
  id: string
  name: string
  description: string
  points: number
  created_at: string
  updated_at: string
}

export interface GetPointsTableProps {
  page: number
  rowsPerPage: number
  globalFilter?: string
}

export interface ActivityTypeResponse {
  results: PointsTableData[]
  total: number
  init: number
  limit: number
}

export interface CreateActivityTypeProps {
  name: string
  description: string
  points: number
}

export interface CreateActivityTypeResponse {
  id: string
  name: string
  description: string
  points: number
  created_at: string
  updated_at: string
}

export interface UpdateActivityTypeResponse {
  name: string
  points: number
}

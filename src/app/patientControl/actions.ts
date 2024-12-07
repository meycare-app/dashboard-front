import { getCommonUsers } from '@/http/admin/get-common-users'
import { GetCommonsUsersTableProps } from './types'

export const getCommonUsersTableData = async ({
  page,
  rowsPerPage,
  globalFilter,
  indicated,
}: GetCommonsUsersTableProps) => {
  let fetchUrl = `/admin/users/${page * rowsPerPage}/${rowsPerPage}`

  const queryParams = new URLSearchParams()

  if (globalFilter) {
    queryParams.append('name', globalFilter)
  }

  if (indicated || indicated === false) {
    queryParams.append('indicated', indicated.toString())
  }

  const queryString = queryParams.toString()
  if (queryString) {
    fetchUrl += `?${queryString}`
  }

  const pointsTableData = await getCommonUsers({ url: fetchUrl })

  return pointsTableData
}

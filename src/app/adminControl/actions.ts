'use server'

import { reactivateAdmin } from '@/http/admin/reactivate-admin'
import { GetAdminsTableProps } from './types'
import { getAdmins } from '@/http/admin/get-admins'
import { inactivateAdmin } from '@/http/admin/inactivate-admin'
import z from 'zod'
import { createServerAction } from 'zsa'
import { updateAdminName } from '@/http/admin/update-admin-name'

export const getAdminsTableData = async ({
  page,
  rowsPerPage,
  globalFilter,
  active,
}: GetAdminsTableProps) => {
  let fetchUrl = `${page * rowsPerPage}/${rowsPerPage}`

  const queryParams = new URLSearchParams()

  if (globalFilter) {
    queryParams.append('name', globalFilter)
  }

  if (active || active === false) {
    queryParams.append('active', active.toString())
  }

  const queryString = queryParams.toString()
  if (queryString) {
    fetchUrl += `?${queryString}`
  }

  const adminsTableData = await getAdmins({ url: fetchUrl })

  return adminsTableData
}

export const reactivateAdminServerAction = createServerAction()
  .input(
    z.object({
      adminId: z.string().min(1, { message: 'Admin ID is required' }),
    }),
    {
      type: 'json',
    },
  )
  .handler(async ({ input }) => {
    const { adminId } = input

    try {
      if (adminId) {
        const response = await reactivateAdmin({ adminId })

        return response
      }
    } catch (error) {
      console.log('Error reactivating admin', error)

      return { message: 'Error reactivating admin' }
    }
  })

export const inactivateAdminServerAction = createServerAction()
  .input(
    z.object({
      adminId: z.string().min(1, { message: 'Admin ID is required' }),
    }),
    {
      type: 'json',
    },
  )
  .handler(async ({ input }) => {
    const { adminId } = input

    try {
      if (adminId) {
        const response = await inactivateAdmin({ adminId })

        return response
      }
    } catch (error) {
      console.log('Error inactivating admin', error)

      return { message: 'Error inactivating admin' }
    }
  })

export const updateAdminNameServerAction = createServerAction()
  .input(
    z.object({
      adminId: z.string().min(1, { message: 'Admin ID is required' }),
      name: z.string().min(1, { message: 'Nome é obrigatório' }),
    }),
    {
      type: 'formData',
    },
  )
  .handler(async ({ input }) => {
    try {
      const response = await updateAdminName(input)

      if (response) {
        if ('message' in response) {
          throw new Error(`Error updating admin name ${response.message}`)
        }
      }

      return response
    } catch (error) {
      console.log(error)

      return { message: error }
    }
  })

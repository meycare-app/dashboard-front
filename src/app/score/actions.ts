'use server'

import { createServerAction, ZSAError } from 'zsa'
import z from 'zod'
import { GetPointsTableProps } from './types'
import { getActivitiesType } from '@/http/activities/get-activities-type'
import { createActivityType } from '@/http/activities/create-activity-type'
import { updateActivityType } from '@/http/activities/update-activity-type'

export const createActivityTypeAction = createServerAction()
  .input(
    z.object({
      name: z.string().min(1, 'O nome da ação é obrigatório'),
      description: z.string().min(1, 'A descrição da ação é obrigatória'),
      points: z.coerce
        .number({ message: 'Insira somente números' })
        .min(1, 'Os pontos da ação são obrigatórios'),
    }),
    {
      type: 'formData',
    },
  )
  .handler(async ({ input }) => {
    try {
      const data = {
        name: input.name,
        description: input.description,
        points: input.points,
      }

      await createActivityType(data)
    } catch (error) {
      if (error instanceof ZSAError) {
        throw new ZSAError('INPUT_PARSE_ERROR', error.message)
      }
      console.error('Error 🚨\n' + JSON.stringify(error))
      throw new ZSAError('ERROR', 'Erro ao criar ação')
    }
  })

export const updateActivityTypeAction = createServerAction()
  .input(
    z.object({
      name: z.string().min(1, 'O nome da ação é obrigatório'),
      points: z.coerce
        .number({ message: 'Insira somente números' })
        .min(1, 'Os pontos da ação são obrigatórios'),
      activityTypeId: z.string(),
    }),
    {
      type: 'formData',
    },
  )
  .handler(async ({ input: data }) => {
    try {
      await updateActivityType(data)
    } catch (error) {
      console.error('Error 🚨\n' + JSON.stringify(error))
    }
  })

export const getPointsTableData = async ({
  page,
  rowsPerPage,
  globalFilter,
}: GetPointsTableProps) => {
  let fetchUrl = `/activities/activity-type/${page * rowsPerPage}/${rowsPerPage}`

  if (globalFilter) {
    fetchUrl += `?name=${globalFilter}`
  }

  const pointsTableData = await getActivitiesType({ url: fetchUrl })

  return pointsTableData
}

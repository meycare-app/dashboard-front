'use server'

import { createUserActivity } from '@/http/activities/create-user-activity'
import { deleteActivity } from '@/http/activities/delete-activity'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const addActivityTypeAction = createServerAction()
  .input(
    z.object({
      userId: z.string(),
      activityTypeId: z.string().min(1, { message: 'Selecione uma ação' }),
    }),
    {
      type: 'formData',
    },
  )
  .handler(async ({ input: data }) => {
    try {
      const response = await createUserActivity(data)

      return response
    } catch (error) {
      console.error('Error creating user activity 🚨\n' + JSON.stringify(error))
    }
  })

export const deleteActivityAction = createServerAction()
  .input(
    z.object({
      id: z.string(),
      activityId: z.string(),
    }),
    {
      type: 'json',
    },
  )
  .handler(async ({ input: data }) => {
    const { id, activityId } = data
    try {
      await deleteActivity({ id, activityId })
    } catch (error) {
      console.error('Error deleting activity 🚨\n' + JSON.stringify(error))
    }
  })

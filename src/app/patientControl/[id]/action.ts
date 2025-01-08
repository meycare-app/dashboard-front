'use server'

import { deleteActivity } from '@/http/activities/delete-activity'
import { z } from 'zod'
import { createServerAction } from 'zsa'

// export const addActivityTypeAction = createServerAction()
//   .input(
//     z.object({
//       id: z.string(),
//     }),
//   )
//   .handler(async ({ input }) => {})

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
      console.error('Error 🚨\n' + JSON.stringify(error))
    }
  })

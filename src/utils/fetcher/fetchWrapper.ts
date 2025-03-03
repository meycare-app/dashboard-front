'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ky from 'ky'
import { getServerSession } from 'next-auth'

export const api = ky.extend({
  prefixUrl: process.env.API_URL || '',
  hooks: {
    beforeRequest: [
      async (request) => {
        const session = await getServerSession(authOptions)
        const accessToken = session?.user.token

        request.headers.set('Authorization', `Bearer ${accessToken}`)
      },
    ],
  },
})

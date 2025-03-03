'use server'

import { getAdminProfile } from '@/http/users/get-admin-profile'

export async function getAdminProfileAction() {
  try {
    const profileData = await getAdminProfile()

    if ('message' in profileData) {
      console.log('Error fetching profile data:', profileData.message)
      return
    }

    return profileData
  } catch (error) {
    console.log('Error fetching profile data:', error)
  }
}

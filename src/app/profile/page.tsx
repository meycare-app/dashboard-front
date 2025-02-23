import { Divider } from '@mui/material'
import { ProfileForm } from './profile-form'
import { getAdminProfileAction } from './actions'

export default async function Profile() {
  const profileData = await getAdminProfileAction()

  return (
    <>
      <main className="mx-auto mt-32 w-4/5">
        {profileData && (
          <>
            <div>
              <h1 className="mb-2 text-4xl">{profileData.name}</h1>
              <Divider />
            </div>

            <ProfileForm {...profileData} />
          </>
        )}
      </main>
    </>
  )
}

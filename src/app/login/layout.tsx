import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default function LoginLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('next-auth.session-token')?.value

  /* if (accessToken) {
    redirect('/dashboard')
  } */

  return <>{children}</>
}

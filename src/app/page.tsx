'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Appbar from '@/components/menu/Navbar'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  if (session !== null) {
    return (
      <>
        <Appbar />
        <main className="mx-auto mt-8 w-4/5"></main>
      </>
    )
  } else {
    router.push('/login')
  }
}

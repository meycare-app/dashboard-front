'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Navbar } from '@/components/menu/Navbar'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  if (session !== null) {
    return (
      <>
        <Navbar />
        <main className="mx-auto mt-8 w-4/5"></main>
      </>
    )
  } else {
    router.push('/login')
  }
}

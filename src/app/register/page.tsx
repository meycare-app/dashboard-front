import Register from '@/components/auth/Register'
import { Navbar } from '@/components/menu/Navbar'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function RegisterPage() {
  const session = await getServerSession()

  const role = session?.user.role

  if (role !== 'MASTER') {
    redirect('/dashboard')
  }

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <Register />
    </div>
  )
}

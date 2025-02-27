'use client'
import LogoBar from '@/components/LogoBar'
import Login from '../../components/auth/Login'

export default function LoginPage() {
  return (
    <main className="flex">
      <LogoBar />
      <Login />
    </main>
  )
}

import { Navbar } from '@/components/menu/Navbar'
import LoginPage from './login/page'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mx-auto mt-8 w-4/5">
        <LoginPage />
      </main>
    </>
  )
}

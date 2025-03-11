import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/login')

  return (
    <>
      <main className="mx-auto mt-8 w-4/5">Sistema de Pontos</main>
    </>
  )
}

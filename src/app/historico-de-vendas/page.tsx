import { Divider } from '@mui/material'
import { Metadata } from 'next'
import Appbar from '@/components/menu/Navbar'
import { HistorySells } from './components'
import { UserType } from './types'

export const metadata: Metadata = {
  title: 'Controle dos Pacientes',
}

async function getUsersList() {
  try {
    const response = await fetch(
      'https://sistema-de-pontos-back.onrender.com/activities/product-purchases/1/10',
    )

    if (response.ok) {
      const data = await response.json()
      return data
    }
  } catch (error) {
    console.log('Ops, ocorreu um erro', error)
  }
}

export default async function PatientControl() {
  const data: UserType[] = await getUsersList()

  return (
    <>
      <Appbar />
      <main className="mx-auto mt-8 w-4/5">
        <div>
          <h1 className="mb-2 text-4xl">Histórico de vendas</h1>
          <Divider />
        </div>

        {data ? <HistorySells data={data} /> : ''}
      </main>
    </>
  )
}

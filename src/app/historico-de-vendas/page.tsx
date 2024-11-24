import { Divider } from '@mui/material'
import { Metadata } from 'next'
import Appbar from '@/components/menu/Navbar'
import { HistorySells } from './components'
import { UserType } from './types'

export const metadata: Metadata = {
  title: 'Controle dos Pacientes',
}

export const DATA_MOCK: UserType[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@example.com',
    phone: '(11) 91234-5678',
    image: 'https://via.placeholder.com/150',
    createdAt: '2024-11-01',
    updatedAt: '2024-11-10',
    total_score: 150,
    is_verified: true,
    product: 'Camiseta',
    value: 59.99,
    saleDate: '2024-11-20',
    client: 'João Silva',
    address: 'Rua das Flores, 123 - São Paulo, SP',
  },
  {
    id: '2',
    name: 'Maria Souza',
    email: 'maria.souza@example.com',
    phone: '(21) 98765-4321',
    image: 'https://via.placeholder.com/150',
    createdAt: '2024-10-25',
    updatedAt: '2024-11-05',
    total_score: 200,
    is_verified: false,
    product: 'Calça Jeans',
    value: 120.0,
    saleDate: '2024-11-18',
    client: 'Maria Souza',
    address: 'Avenida Paulista, 456 - São Paulo, SP',
  },
  {
    id: '3',
    name: 'Carlos Mendes',
    email: 'carlos.mendes@example.com',
    phone: '(31) 92345-6789',
    image: 'https://via.placeholder.com/150',
    createdAt: '2024-11-02',
    updatedAt: '2024-11-12',
    total_score: 300,
    is_verified: true,
    product: 'Tênis',
    value: 250.0,
    saleDate: '2024-11-15',
    client: 'Carlos Mendes',
    address: 'Rua Verde, 789 - Belo Horizonte, MG',
  },
]

// async function getUsersList() {
//   try {
//     const response = await fetch(
//       'https://sistema-de-pontos-back.onrender.com/users',
//     )

//     if (response.ok) {
//       const data = await response.json()
//       return data
//     }
//   } catch (error) {
//     console.log('Ops, ocorreu um erro', error)
//   }
// }

export default async function PatientControl() {
  // const data = await getUsersList()

  return (
    <>
      <Appbar />
      <main className="mx-auto mt-8 w-4/5">
        <div>
          <h1 className="mb-2 text-4xl">Histórico de vendas</h1>
          <Divider />
        </div>

        <HistorySells data={DATA_MOCK} />
      </main>
    </>
  )
}

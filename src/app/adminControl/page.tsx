import { Divider } from '@mui/material'

import { Metadata } from 'next'
import { AdminsTable } from './admins-table'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Controle dos Administradores',
}

export default async function AdminControl() {
  const session = await getServerSession()

  const role = session?.user.role

  if (role !== 'MASTER') {
    redirect('/dashboard')
  }

  return (
    <>
      <main className="mx-auto mt-32 w-4/5">
        <div>
          <h1 className="mb-2 text-4xl">Controle dos Administradores</h1>
          <Divider />
        </div>

        <AdminsTable />
      </main>
    </>
  )
}

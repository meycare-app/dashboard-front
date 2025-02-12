import { Divider } from '@mui/material'

import { Metadata } from 'next'
import { PatientsTable } from './patients-table'

export const metadata: Metadata = {
  title: 'Controle dos Pacientes',
}

export default async function PatientControl() {
  return (
    <>
      <main className="mx-auto mt-32 w-4/5">
        <div>
          <h1 className="mb-2 text-4xl">Controle dos Pacientes</h1>
          <Divider />
        </div>

        <PatientsTable />
      </main>
    </>
  )
}

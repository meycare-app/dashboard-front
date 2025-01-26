import { Divider } from '@mui/material'

import { Metadata } from 'next'
import PointsTable from './points-table'

export const metadata: Metadata = {
  title: 'Pontuação',
}

export default function Score() {
  return (
    <>
      <main className="mx-auto mt-32 w-4/5">
        <div>
          <h1 className="mb-2 text-4xl">Pontuação</h1>
          <Divider />
        </div>
        <PointsTable />
      </main>
    </>
  )
}

import { Divider, Paper } from '@mui/material'
import { Navbar } from '@/components/menu/Navbar'
import { Metadata } from 'next'
import { Dashboard } from './dashboard'
import { getDashboardData } from '@/http/dashboard/get-dashboard-data'
import { addDays } from 'date-fns'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const url = `admin/dashboard?start_date=${addDays(new Date(), -30).toISOString()}&end_date=${addDays(new Date(), -1).toISOString()}`

  const dashboardData = await getDashboardData(url)

  return (
    <>
      <Navbar />
      <main className="mx-auto mb-20 mt-32 w-4/5">
        <div>
          <h1 className="mb-2 text-4xl">Dashboard</h1>
          <Divider />

          <Paper className="mt-10 px-4 pb-52 pt-4">
            <Dashboard dashboardData={dashboardData} />
          </Paper>
        </div>
      </main>
    </>
  )
}

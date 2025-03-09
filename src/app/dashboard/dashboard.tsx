'use client'

import { addDays } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { useState } from 'react'
import { DashboardContent } from './dashboard-content'
import { DashboardDataType } from '@/types/dashboard-types'
import { DashboardFilters } from './dashboard-filters'
import { getDashboardData } from '@/http/dashboard/get-dashboard-data'

interface DashboardProps {
  dashboardData: DashboardDataType
}

export function Dashboard({ dashboardData }: DashboardProps) {
  const [data, setData] = useState<DashboardDataType>(dashboardData)
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: addDays(new Date(), -1),
  })

  const fetchDashboardData = async () => {
    const url = `admin/dashboard?start_date=${date?.from?.toISOString()}&end_date=${date?.to?.toISOString()}`

    const data = await getDashboardData(url)
    setData(data)
  }

  return (
    <>
      <DashboardFilters
        date={date}
        setDate={setDate}
        fetchDashboardData={fetchDashboardData}
      />

      <main>
        <DashboardContent dashboardData={data} />
      </main>
    </>
  )
}

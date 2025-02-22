import {
  AccountCircleOutlined,
  EmojiEventsOutlined,
  StorefrontOutlined,
} from '@mui/icons-material'
import { Divider, Paper } from '@mui/material'
import { Card } from './components/Card'
import { Navbar } from '@/components/menu/Navbar'
import { Metadata } from 'next'
import { CardFilter } from './components/card-filter'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard page',
}

export default function Dashboard() {
  const usersData = [
    {
      title: 'Total',
      count: 5000,
      lastMonthComparison: 'up',
      percentage: 10,
    },
    {
      title: 'Novos',
      count: 5000,
      lastMonthComparison: 'up',
      percentage: 10,
    },
    {
      title: 'Ativos',
      count: 5000,
      lastMonthComparison: 'up',
      percentage: 10,
    },
  ]

  const scoreData = [
    {
      title: 'Entregues',
      count: 5000,
      lastMonthComparison: 'down',
      percentage: 10,
    },
    {
      title: 'Gastos',
      count: 5000,
      lastMonthComparison: 'down',
      percentage: 10,
    },
  ]

  const sellData = [
    {
      title: 'Total',
      count: 3450,
      lastMonthComparison: 'up',
      percentage: 10,
    },
    {
      title: 'Produto mais vendido',
      subtitle: 'Creme para cabelo #234',
      mostSaleType: 'score',
      count: 342,
      lastMonthComparison: 'up',
      percentage: 10,
    },
    {
      title: 'Produto mais vendido',
      subtitle: 'Creme para cabelo #234',
      mostSaleType: 'cash',
      count: 342,
      lastMonthComparison: 'down',
      percentage: 10,
    },
  ]

  return (
    <>
      <Navbar />
      <main className="mx-auto mb-20 mt-32 w-4/5">
        <div>
          <h1 className="mb-2 text-4xl">Dashboard</h1>
          <Divider />

          <Paper className="mt-10 px-4 pb-52 pt-4">
            <CardFilter />

            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 2xl:gap-20">
              <div className="mx-auto w-full">
                <h2 className="mb-4 text-center text-2xl">Usuários</h2>

                <div className="flex flex-col gap-6">
                  {usersData.map((data, index) => {
                    return (
                      <Card
                        key={index}
                        icon={AccountCircleOutlined}
                        data={data}
                      />
                    )
                  })}
                </div>
              </div>
              <div className="mx-auto w-full">
                <h2 className="mb-4 text-center text-2xl">Pontos</h2>

                <div className="flex flex-col gap-6">
                  {scoreData.map((data, index) => {
                    return (
                      <Card
                        key={index}
                        icon={EmojiEventsOutlined}
                        data={data}
                      />
                    )
                  })}
                </div>
              </div>
              <div className="mx-auto w-full">
                <h2 className="mb-4 text-center text-2xl">Vendas</h2>

                <div className="flex flex-col gap-6">
                  {sellData.map((data, index) => {
                    return (
                      <Card key={index} icon={StorefrontOutlined} data={data} />
                    )
                  })}
                </div>
              </div>
            </div>
          </Paper>
        </div>
      </main>
    </>
  )
}

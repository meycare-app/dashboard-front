'use client'

import { Card } from '@/components/dashboard/card'
import { DashboardDataType } from '@/types/dashboard-types'
import {
  AccountCircleOutlined,
  EmojiEventsOutlined,
  StorefrontOutlined,
} from '@mui/icons-material'

interface DashboardContentProps {
  dashboardData: DashboardDataType
}

export function DashboardContent({ dashboardData }: DashboardContentProps) {
  const usersData = [
    {
      title: 'Total',
      count: dashboardData.user_count ? dashboardData.user_count.totalUsers : 0,
      percentage: dashboardData.user_count
        ? dashboardData.user_count.totalUsersIncreasePercentage
        : 0,
    },
    {
      title: 'Novos',
      count: dashboardData.user_count ? dashboardData.user_count.newUsers : 0,
      percentage: dashboardData.user_count
        ? dashboardData.user_count.newUsersIncreasePercentage
        : 0,
    },
    {
      title: 'Ativos',
      count: dashboardData.user_count.active,
      percentage: dashboardData.user_count
        ? dashboardData.user_count.activeIncreasePercentage
        : 0,
    },
  ]

  const scoreData = [
    {
      title: 'Entregues',
      count: dashboardData.activity_count
        ? dashboardData.activity_count.totalPointsGiven
        : 0,
      percentage: dashboardData.activity_count
        ? dashboardData.activity_count.totalPointsGivenIncreasePercentage
        : 0,
    },
    {
      title: 'Gastos',
      count: dashboardData.activity_count
        ? dashboardData.activity_count.totalPointsSpent
        : 0,
      percentage: dashboardData.activity_count
        ? dashboardData.activity_count.totalPointsSpentIncreasePercentage
        : 0,
    },
  ]

  const sellData = [
    {
      title: 'Total',
      count: dashboardData.purchase_count
        ? dashboardData.purchase_count.newTotalSales
        : 0,
      percentage: dashboardData.purchase_count
        ? dashboardData.purchase_count.totalSalesIncreasePercentage
        : 0,
    },
    {
      title: 'Produto mais vendido',
      subtitle: dashboardData.purchase_count.mostSoldProductWithPoints
        ? `${dashboardData.purchase_count.mostSoldProductWithPoints?.name}`
        : 'Sem registro',
      mostSaleType: 'score',
      count: dashboardData.purchase_count.mostSoldProductWithPointsQuantity,
      percentage: dashboardData.purchase_count
        ? dashboardData.purchase_count
            .mostSoldProductsWithPointsIncreasePercentage
        : 0,
    },
    {
      title: 'Produto mais vendido',
      subtitle: dashboardData.purchase_count.mostSoldProductWithCash
        ? `${dashboardData.purchase_count.mostSoldProductWithCash?.name}`
        : 'Sem registro',
      mostSaleType: 'cash',
      count: dashboardData.purchase_count.mostSoldProductWithCashQuantity,
      percentage: dashboardData.purchase_count
        ? dashboardData.purchase_count
            .mostSoldProductsWithCashIncreasePercentage
        : 0,
    },
  ]

  return (
    <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 2xl:gap-20">
      <div className="mx-auto w-full">
        <h2 className="mb-4 text-center text-2xl">Usuários</h2>

        <div className="flex flex-col gap-6">
          {usersData.map((data, index) => {
            return <Card key={index} icon={AccountCircleOutlined} data={data} />
          })}
        </div>
      </div>
      <div className="mx-auto w-full">
        <h2 className="mb-4 text-center text-2xl">Pontos</h2>

        <div className="flex flex-col gap-6">
          {scoreData.map((data, index) => {
            return (
              <Card key={index * 10} icon={EmojiEventsOutlined} data={data} />
            )
          })}
        </div>
      </div>
      <div className="mx-auto w-full">
        <h2 className="mb-4 text-center text-2xl">Vendas</h2>

        <div className="flex flex-col gap-6">
          {sellData.map((data, index) => {
            return (
              <Card key={index * 100} icon={StorefrontOutlined} data={data} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

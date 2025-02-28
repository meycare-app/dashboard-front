'use client'
import { Divider } from '@mui/material'
import { Navbar } from '@/components/menu/Navbar'
import { HistorySells } from './components'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Purchase } from './types'

export default function PatientControl() {
  const [sellData, setSellData] = useState<any>([])
  const [filteredData, setFilteredData] = useState<Purchase[]>([])
  const [filters, setFilters] = useState({ name: '', amount: '', date: '' })
  const { data: session } = useSession()

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.token) {
        try {
          const response = await fetch(
            `http://3.225.87.60:3000/admin/purchases/1/10`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${session.user.token}`,
              },
            },
          )

          if (response.ok) {
            const data = await response.json()
            setSellData(data)
            setFilteredData(data.results)
          } else {
            console.error('Erro ao buscar os dados:', response.statusText)
          }
        } catch (error) {
          console.error('Ops, ocorreu um erro:', error)
        }
      }
    }

    fetchData()
  }, [session])

  useEffect(() => {
    const filtered = sellData.results?.filter((purchase: Purchase) => {
      const matchesName = filters.name
        ? purchase.id.toLowerCase().includes(filters.name.toLowerCase())
        : true
      const matchesAmount = filters.amount
        ? purchase.total_amount === Number(filters.amount)
        : true
      const matchesDate = filters.date
        ? new Date(purchase.date).toISOString().split('T')[0] === filters.date
        : true
      return matchesName && matchesAmount && matchesDate
    })
    setFilteredData(filtered)
  }, [filters, sellData])

  return (
    <>
      <Navbar />
      <main className="mx-auto mt-8 w-4/5">
        <div>
          <h1 className="mb-2 mt-32 text-4xl">Histórico de vendas</h1>
          <Divider />
        </div>

        <div className="relative mt-[38px] flex flex-wrap items-center gap-4">
          <div className="relative">
            <label className="absolute left-5 top-[-9px] bg-white px-2 text-xs font-medium text-gray-700">
              Produto
            </label>
            <input
              type="text"
              placeholder="Buscar pelo produto"
              value={filters.name}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-[310px] rounded-lg border border-gray-300 p-3 text-gray-700 shadow-sm outline-none"
            />
          </div>

          <div className="relative">
            <label className="absolute left-5 top-[-9px] bg-white px-2 text-xs font-medium text-gray-700">
              Valor
            </label>
            <select
              value={filters.amount}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, amount: e.target.value }))
              }
              className="w-[310px] rounded-lg border border-gray-300 p-3 text-gray-700 shadow-sm outline-none"
            >
              <option value="">Selecione o intervalo de valores</option>
              {[...new Set(sellData.results?.map((p) => p.total_amount))].map(
                (amount) => (
                  <option key={amount} value={amount}>
                    R$ {amount.toLocaleString('pt-BR')}
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="relative">
            <label className="absolute left-5 top-[-9px] bg-white px-2 text-xs font-medium text-gray-700">
              Data
            </label>
            <input
              type="date"
              value={filters.date}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, date: e.target.value }))
              }
              className="w-[310px] rounded-lg border border-gray-300 p-3 text-gray-700 shadow-sm outline-none"
            />
          </div>

          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.249995 1.61C2.26999 4.2 5.99999 9 5.99999 9V15C5.99999 15.55 6.44999 16 6.99999 16H9C9.55 16 10 15.55 10 15V9C10 9 13.72 4.2 15.74 1.61C16.25 0.95 15.78 0 14.95 0H1.03999C0.209995 0 -0.260005 0.95 0.249995 1.61Z"
              fill="black"
              fill-opacity="0.56"
            />
          </svg>

          <button className="h-10 self-end rounded-lg bg-yellow-600 px-6 py-2 font-medium text-white shadow-md transition hover:bg-yellow-700">
            FILTRAR
          </button>
        </div>

        {filteredData?.length > 0 ? (
          <HistorySells data={filteredData} />
        ) : (
          <>Sem histórico ou usuário não logado</>
        )}
      </main>
    </>
  )
}

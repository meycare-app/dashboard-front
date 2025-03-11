'use client'

import logo from '@/assets/logo.svg'
import MenuIcon from '@mui/icons-material/Menu'
import Image from 'next/image'
import { Sidebar } from './Sidebar'
import { useState } from 'react'
import { IconButton } from '@mui/material'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const [sideBarOpen, setSideBarOpen] = useState(false)
  const path = usePathname()

  const sidebarData = [
    {
      title: 'Dashboard',
      link: '/dashboard',
      isActive: path === '/dashboard',
    },
    {
      title: 'Controle dos Pacientes',
      link: '/patientControl',
      isActive: path.startsWith('/patientControl'),
    },
    {
      title: 'Controle dos Administradores',
      link: '/adminControl',
      isActive: path === '/adminControl',
    },
    {
      title: 'Cadastro dos Administradores',
      link: '/register',
      isActive: path === '/register',
    },
    {
      title: 'Histórico de Vendas',
      link: '/historico-de-vendas',
      isActive: path === '/historico-de-vendas',
    },
    {
      title: 'Pontuação',
      link: '/score',
      isActive: path === '/score',
    },
    {
      title: 'Perfil',
      link: '/profile',
      isActive: path === '/profile',
    },
  ]

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full">
        <div className="flex items-center gap-6 bg-[#B6821C] px-6 py-3">
          <IconButton type="button" onClick={() => setSideBarOpen(true)}>
            <MenuIcon className="text-white" />
          </IconButton>

          <Image src={logo} alt="Logo" width={107} />
        </div>

        <Sidebar
          open={sideBarOpen}
          setOpen={setSideBarOpen}
          data={sidebarData}
        />
      </header>
    </>
  )
}

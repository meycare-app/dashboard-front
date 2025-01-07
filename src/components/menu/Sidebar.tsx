import Image from 'next/image'
import logo from '@/assets/logo.svg'
import Link from 'next/link'
import { SidebarProps } from './types'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'

export default function Sidenav({ open, setOpen }: SidebarProps) {
  return (
    <div
      className={`${open ? 'translate-x-0' : '-translate-x-full'} absolute left-0 top-0 z-50 flex min-h-screen w-64 flex-col transition-transform duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between bg-[#B6821C] px-6 py-3">
        <Image src={logo} alt="Logo" width={107} />

        <IconButton>
          <CloseIcon
            onClick={() => setOpen(false)}
            className="cursor-pointer text-white"
          />
        </IconButton>
      </div>

      <div className="flex-1 bg-white py-10 shadow">
        <nav className="flex flex-col px-2">
          <Link
            href="/dashboard"
            className="border-b border-[#D0CDC4] border-opacity-60 px-3 py-3 transition-colors duration-300 hover:text-[#B6821C]"
          >
            Dashboard
          </Link>
          <Link
            href="/patientControl"
            className="border-b border-[#D0CDC4] border-opacity-60 px-3 py-3 transition-colors duration-300 hover:text-[#B6821C]"
          >
            Controle dos Pacientes
          </Link>
          <Link
            href="/"
            className="border-b border-[#D0CDC4] border-opacity-60 px-3 py-3 transition-colors duration-300 hover:text-[#B6821C]"
          >
            Controle dos Administradores
          </Link>
          <Link
            href="/"
            className="border-b border-[#D0CDC4] border-opacity-60 px-3 py-3 transition-colors duration-300 hover:text-[#B6821C]"
          >
            Cadastro dos Administradores
          </Link>
          <Link
            href="/historico-de-vendas"
            className="border-b border-[#D0CDC4] border-opacity-60 px-3 py-3 transition-colors duration-300 hover:text-[#B6821C]"
          >
            Histórico de Vendas
          </Link>
          <Link
            href="/"
            className="border-b border-[#D0CDC4] border-opacity-60 px-3 py-3 transition-colors duration-300 hover:text-[#B6821C]"
          >
            Pontuação
          </Link>
          <Link
            href="/"
            className="border-b border-[#D0CDC4] border-opacity-60 px-3 py-3 transition-colors duration-300 hover:text-[#B6821C]"
          >
            Perfil
          </Link>
        </nav>
      </div>
    </div>
  )
}

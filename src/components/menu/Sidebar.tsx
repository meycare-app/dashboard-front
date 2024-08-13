import Image from 'next/image'
import logo from '@/assets/logo.svg'
import Link from 'next/link'
import { SidebarProps } from './types'
import CloseIcon from '@mui/icons-material/Close'

export default function Sidenav({ open, setOpen }: SidebarProps) {
  return (
    <div
      className={`${open ? 'translate-x-0' : '-translate-x-full'} absolute left-0 top-0 z-50 flex min-h-screen w-64 flex-col transition-transform duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between bg-[#B6821C] px-6 py-3">
        <Image src={logo} alt="Logo" width={107} />

        <CloseIcon
          onClick={() => setOpen(false)}
          className="cursor-pointer text-white"
        />
      </div>

      <div className="bg-white py-10">
        <nav className="flex flex-col px-2">
          <Link
            href="/"
            className="border-b border-[#D0CDC4] border-opacity-60 px-3 py-3"
          >
            Dashboard
          </Link>
          <Link
            href="/"
            className="border-b border-[#D0CDC4] border-opacity-60 px-3 py-3"
          >
            Controle dos Pacientes
          </Link>
          <Link
            href="/"
            className="border-b border-[#D0CDC4] border-opacity-60 px-3 py-3"
          >
            Controle dos Administradores
          </Link>
          <Link
            href="/"
            className="border-b border-[#D0CDC4] border-opacity-60 px-3 py-3"
          >
            Cadastro dos Administradores
          </Link>
          <Link
            href="/"
            className="border-b border-[#D0CDC4] border-opacity-60 px-3 py-3"
          >
            Pontuação
          </Link>
          <Link
            href="/"
            className="border-b border-[#D0CDC4] border-opacity-60 px-3 py-3"
          >
            Perfil
          </Link>
        </nav>
      </div>
    </div>
  )
}

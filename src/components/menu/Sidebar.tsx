import Image from "next/image"
import logo from "@/assets/logo.svg"
import Link from "next/link"
import { SidebarProps } from "./types"
import CloseIcon from '@mui/icons-material/Close'

export default function Sidenav({open, setOpen}: SidebarProps) {
  return (
    <div className={`${open ? 'translate-x-0' : '-translate-x-full'} absolute w-64 min-h-screen flex flex-col top-0 left-0 transition-transform duration-300 ease-in-out z-50`}>
      <header className="flex items-center justify-between px-6 py-3 bg-[#B6821C]">
        <Image src={logo} alt="Logo" width={107} />

        <CloseIcon onClick={() => setOpen(false)} className="text-white cursor-pointer" />
      </header>

      <div className="py-10 bg-white">
        <nav className="flex flex-col px-2">
          <Link href="/" className="px-3 py-3 border-b border-[#D0CDC4] border-opacity-60">
            Dashboard
          </Link>
          <Link href="/" className="px-3 py-3 border-b border-[#D0CDC4] border-opacity-60">
            Controle dos Pacientes
          </Link>
          <Link href="/" className="px-3 py-3 border-b border-[#D0CDC4] border-opacity-60">
            Controle dos Administradores
          </Link>
          <Link href="/" className="px-3 py-3 border-b border-[#D0CDC4] border-opacity-60">
            Cadastro dos Administradores
          </Link>
          <Link href="/" className="px-3 py-3 border-b border-[#D0CDC4] border-opacity-60">
            Pontuação
          </Link>
          <Link href="/" className="px-3 py-3 border-b border-[#D0CDC4] border-opacity-60">
            Perfil
          </Link>
        </nav>
      </div>
    </div>
  )
}
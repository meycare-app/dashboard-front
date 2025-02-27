'use client'

import logo from '@/assets/logo.svg'
import MenuIcon from '@mui/icons-material/Menu'
import Image from 'next/image'
import Sidebar from './Sidebar'
import { useState } from 'react'
import { IconButton } from '@mui/material'
import { signOut } from 'next-auth/react'

export default function Appbar() {
  const [sideBarOpen, setSideBarOpen] = useState(false)

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full">
        <div className="flex items-center gap-6 bg-[#B6821C] px-6 py-3">
          <IconButton type="button" onClick={() => setSideBarOpen(true)}>
            <MenuIcon className="text-white" />
          </IconButton>

          <Image src={logo} alt="Logo" width={107} />
        </div>
        <button
          onClick={() => signOut()}
          className="rounded bg-red-500 px-4 py-2 text-white"
        >
          Sair
        </button>
        <Sidebar open={sideBarOpen} setOpen={setSideBarOpen} />
      </header>
    </>
  )
}

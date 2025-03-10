'use client'

import Image from 'next/image'
import logo from '@/assets/logo.svg'
import Link from 'next/link'
import { SidebarProps } from './types'
import CloseIcon from '@mui/icons-material/Close'
import { Drawer, IconButton } from '@mui/material'

export function Sidebar({ open, setOpen, data }: SidebarProps) {
  return (
    <Drawer open={open} onClose={() => setOpen(false)} transitionDuration={300}>
      <div className="flex items-center justify-between bg-[#B6821C] px-4 py-3">
        <Image src={logo} alt="Logo" width={107} />

        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon className="cursor-pointer text-white" />
        </IconButton>
      </div>

      <div className="w-64 flex-1 bg-white py-10 shadow">
        <nav className="flex flex-col px-2">
          {data.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.link}
                className={`border-b border-[#D0CDC4] border-opacity-60 px-3 py-3 transition-colors duration-300 ${item.isActive ? 'text-[#B6821C]' : 'hover:text-[#B6821C]'} ${item.hidden && 'hidden'}`}
              >
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
    </Drawer>
  )
}

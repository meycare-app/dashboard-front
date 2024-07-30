'use client'

import logo from "@/assets/logo.svg"
import MenuIcon from "@mui/icons-material/Menu"
import Image from "next/image"
import Sidebar from "./Sidebar"
import { useState } from "react"

export default function Appbar() {
  const [sideBarOpen, setSideBarOpen] = useState(false)

  return (
    <>
      <header>
        <div className="flex items-center gap-6 bg-[#B6821C] px-6 py-3">
          <button type="button" onClick={() => setSideBarOpen(true)}>
            <MenuIcon className="text-white" />
          </button>

          <Image src={logo} alt="Logo" width={107} />
        </div>

        <Sidebar open={sideBarOpen} setOpen={setSideBarOpen} />
      </header>
    </>
  )
}

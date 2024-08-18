import { GroupsOutlined } from '@mui/icons-material'
import { Chip } from '@mui/material'
import Image from 'next/image'
import chart from '@/assets/dashboard/dashboardChart.png'

export default function Card() {
  return (
    <div className="flex w-fit items-center gap-4 rounded p-3 shadow">
      <div className="space-y-2">
        <span className="flex items-center gap-2">
          <div className="">
            <GroupsOutlined className="h-7 w-7 rounded-full bg-[#777676] bg-opacity-60 p-1 text-white" />
          </div>
          <p className="text-black/60">Cadastrados</p>
        </span>

        <span className="flex items-center gap-3 pt-1.5">
          <p className="text-2xl">5000</p>
          <Chip
            label="+10%"
            size="small"
            className="bg-[#9DF4A1D9] bg-opacity-85 px-1.5 text-[#197D1D]"
          />
        </span>
        <span className="text-sm text-black/60">No último mês</span>
      </div>

      <div>
        <Image src={chart} width={150} height={100} alt="Chart" />
      </div>
    </div>
  )
}

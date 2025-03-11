import { sliceDecimals } from '@/utils/sliceDecimals'
import { Chip, Paper, SvgIconProps } from '@mui/material'

interface CardData {
  title: string
  count: number
  percentage: number
  subtitle?: string
  mostSaleType?: string
}

interface CardProps {
  icon: React.ElementType<SvgIconProps>
  data: CardData
}

export function Card({ icon: Icon, data }: CardProps) {
  return (
    <Paper className="flex w-full flex-col gap-4 rounded p-3 shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <Icon className="h-9 w-9 rounded-full bg-opacity-60 bg-gradient-to-b from-[#FFAF14] to-[#FFE0B1] p-1 text-[#8E6008]" />
          </div>

          <div>
            <p className="text-black/60">{data.title}</p>
            {data.subtitle && (
              <p className="text-xs text-black/60">{data.subtitle}</p>
            )}
          </div>
        </div>

        {data.mostSaleType && (
          <div className="self-start">
            <Chip
              className="bg-[#B5E4F7] text-[8px] text-[#21005D]"
              size="small"
              label={
                data.mostSaleType === 'score'
                  ? 'Usando pontos'
                  : 'Usando dinheiro'
              }
            />
          </div>
        )}
      </div>

      <div className="flex w-full items-center justify-between">
        <p className="text-2xl">{data.count}</p>

        <span className="flex items-center gap-1 pt-1.5">
          <Chip
            label={`${data.percentage > 0 ? '+' : ''}${sliceDecimals(data.percentage)}%`}
            size="small"
            className={`bg-opacity-85 px-1.5 ${data.percentage > 0 ? 'bg-[#9DF4A1D9] text-[#197D1D]' : data.percentage < 0 ? 'bg-[#F49D9D] text-[#7D1919]' : 'bg-[#dbdbd9] text-[#494948]'}`}
          />
          <p className="text-sm text-black/60">No último mês</p>
        </span>
      </div>
    </Paper>
  )
}

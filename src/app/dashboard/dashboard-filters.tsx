'use client'

import { Button } from '@/components/shadcn/button'
import { Calendar } from '@/components/shadcn/calendar'
import { Popover, PopoverContent } from '@/components/shadcn/popover'
import { cn } from '@/lib/utils'
import { Button as ButtonMui } from '@mui/material'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { ptBR } from 'date-fns/locale'
import { FilterAlt } from '@mui/icons-material'

interface DashboardFiltersProps extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined
  setDate: (date: DateRange | undefined) => void
  fetchDashboardData: () => void
}

export function DashboardFilters({
  className,
  date,
  setDate,
  fetchDashboardData,
}: DashboardFiltersProps) {
  return (
    <header>
      <div className="flex justify-between">
        <span className="flex items-center gap-1 md:gap-4">
          <p className="-mr-2">Período</p>
          <div className={cn('grid gap-2', className)}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={'outline'}
                  className={cn(
                    'flex w-full items-center justify-center text-left font-normal',
                    !date && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon />
                  {date?.from ? (
                    date.to ? (
                      <>
                        De {format(date.from, 'dd/MM/y')} a{' '}
                        {format(date.to, 'dd/MM/y')}
                      </>
                    ) : (
                      format(date.from, 'dd/MM/y')
                    )
                  ) : (
                    <span>Escolha uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>
          <FilterAlt className="text-black/55" />
        </span>

        <ButtonMui
          variant="contained"
          color="primary"
          className="font-semibold disabled:opacity-60"
          onClick={fetchDashboardData}
          disabled={!date?.from || !date?.to}
        >
          Filtrar
        </ButtonMui>
      </div>
    </header>
  )
}

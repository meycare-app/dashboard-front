'use client'

import {
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  ThemeProvider,
} from '@mui/material'
import { ptBR } from '@mui/material/locale'
import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { PatientsTableProps, UserType } from '../types'
import { useState } from 'react'
import { useDebounce } from '@/utils/debounce/useDebounce'
import { Person } from '@mui/icons-material'
import { phoneMask } from '@/utils/masks/phoneMask'

const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#E3A631',
      },
    },
  },
  ptBR,
)

const columnHelper = createColumnHelper<UserType>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Usuário',
    cell: (info) => {
      return (
        <span className="flex items-center gap-1">
          <Person className="h-5 w-5 text-[#000000] text-opacity-[56%]" />
          {info.getValue()}
        </span>
      )
    },
  }),
  columnHelper.accessor('phone', {
    header: 'Celular',
    cell: (info) => phoneMask(info.getValue()),
  }),
  columnHelper.accessor('is_verified', {
    header: 'Indicado',
    cell: (info) => (info.getValue() ? 'Sim' : 'Não'),
  }),
  columnHelper.accessor('total_score', {
    header: 'Pontos',
    cell: (info) => info.getValue(),
  }),
]

export function PatientsTable({ data }: PatientsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [globalFilterInput, setGlobalFilterInput] = useState('')
  const globalFilter = useDebounce(globalFilterInput, 300)

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
  })

  const handleGlobalFilterChange = (
    ev: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setGlobalFilterInput(ev.target.value)
  }

  const handlePaginationChange = (
    ev: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPagination((state) => ({
      ...state,
      pageIndex: newPage,
    }))
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPagination({ pageIndex: 0, pageSize: parseInt(event.target.value, 10) })
  }
  return (
    <ThemeProvider theme={theme}>
      <Paper className="my-10 pt-4">
        <div className="mb-6 flex items-center gap-4 px-4">
          <TextField
            className="w-[300px]"
            label="Nome do paciente"
            placeholder="Buscar por nome do paciente"
            value={globalFilterInput}
            onChange={handleGlobalFilterChange}
          />
          <FormControl>
            <InputLabel id="indicated">Indicado</InputLabel>
            <Select
              labelId="indicated"
              label="Indicado"
              className="w-[180px]"
              defaultValue={
                (table.getColumn('is_verified')?.getFilterValue() as string) ??
                'all'
              }
              onChange={(ev: SelectChangeEvent<string>) => {
                const value = ev.target.value
                if (value === 'all') {
                  table.getColumn('is_verified')?.setFilterValue(null)
                } else {
                  table
                    .getColumn('is_verified')
                    ?.setFilterValue(value === 'indicated')
                }
              }}
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="indicated">Sim</MenuItem>
              <MenuItem value="nonindicated">Não</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell key={header.id} className="font-medium">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })}
            </TableHead>

            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <TablePagination
            component="div"
            count={table.getRowCount()}
            page={pagination.pageIndex}
            onPageChange={handlePaginationChange}
            rowsPerPage={pagination.pageSize}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10]}
          />
        </div>
      </Paper>
    </ThemeProvider>
  )
}

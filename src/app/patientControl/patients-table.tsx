'use client'

import {
  Card,
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
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDebounce } from '@/utils/debounce/useDebounce'
import { Person, Search } from '@mui/icons-material'
import { phoneMask } from '@/utils/masks/phoneMask'
import { getCommonUsersTableData } from './actions'
import { CommonUserData } from './types'
import Link from 'next/link'

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

const columnHelper = createColumnHelper<CommonUserData>()

export function PatientsTable() {
  const [tableData, setTableData] = useState<CommonUserData[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [rowTotalCount, setRowTotalCount] = useState(0)
  const [isIndicated, setIsIndicated] = useState<boolean | null>(null)
  const [globalFilterInput, setGlobalFilterInput] = useState('')
  const globalFilter = useDebounce(globalFilterInput, 300)

  const columns = [
    columnHelper.accessor('name', {
      header: 'Usuário',
      cell: (info) => {
        return (
          <span>
            <Link
              href={`/patientControl/${info.row.original.id}`}
              className="flex items-center gap-1"
            >
              <Person className="h-5 w-5 text-[#000000] text-opacity-[56%]" />
              {info.getValue()}
            </Link>
          </span>
        )
      },
    }),
    columnHelper.accessor('phone', {
      header: 'Celular',
      cell: (info) => phoneMask(info.getValue()),
    }),
    columnHelper.accessor('indicated', {
      header: 'Indicado',
      cell: (info) => (info.getValue() ? 'Sim' : 'Não'),
    }),
    columnHelper.accessor('points', {
      header: 'Pontos',
      cell: (info) => info.getValue(),
    }),
  ]

  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualFiltering: true,
  })

  const handleGlobalFilterChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setGlobalFilterInput(ev.target.value)
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCommonUsersTableData({
        page,
        rowsPerPage,
        globalFilter,
        indicated: isIndicated,
      })

      if (globalFilter || isIndicated) {
        setPage(0)
      }

      setTableData(response.results)
      setRowTotalCount(response.total)
    }

    fetchData()
  }, [page, rowsPerPage, globalFilter, isIndicated])

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
              defaultValue="all"
              onChange={(ev: SelectChangeEvent<string>) => {
                const value = ev.target.value
                if (value === 'all') {
                  setIsIndicated(null)
                } else {
                  setIsIndicated(value === 'indicated')
                }
              }}
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="indicated">Sim</MenuItem>
              <MenuItem value="nonindicated">Não</MenuItem>
            </Select>
          </FormControl>
        </div>

        {tableData && tableData.length <= 0 && (
          <div className="flex h-96 items-center justify-center">
            <Card className="flex flex-col items-center gap-2 p-20">
              <span>
                <Search className="text-4xl text-[#E3A631]" />
              </span>

              <p className="text-center text-lg text-[#E3A631]">
                Nenhum paciente encontrado
              </p>
            </Card>
          </div>
        )}

        {tableData && tableData.length > 0 && (
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
                      <Link
                        href={`/patientControl/${row.original.id}`}
                        className="hover:underline"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Link>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <TablePagination
          component="div"
          count={rowTotalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página"
          rowsPerPageOptions={[5, 10]}
        />
      </Paper>
    </ThemeProvider>
  )
}

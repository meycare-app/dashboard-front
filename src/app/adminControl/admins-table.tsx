'use client'

import {
  Button,
  Card,
  Chip,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import { MoreHoriz, Person, Refresh, Search } from '@mui/icons-material'
import Link from 'next/link'
import { AdminData } from './types'
import {
  getAdminsTableData,
  inactivateAdminServerAction,
  reactivateAdminServerAction,
} from './actions'
import { useServerAction } from 'zsa-react'

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

const columnHelper = createColumnHelper<AdminData>()

export function AdminsTable() {
  const [selectedRowData, setSelectedRowData] = useState<AdminData | null>(null)
  const [openUpdateAdminName, setOpenUpdateAdminName] = useState(false)
  const [tableData, setTableData] = useState<AdminData[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [rowTotalCount, setRowTotalCount] = useState(0)
  const [isActive, setIsActive] = useState<boolean | null>(null)
  const [globalFilterInput, setGlobalFilterInput] = useState('')
  const globalFilter = useDebounce(globalFilterInput, 300)

  const columns = [
    columnHelper.accessor('name', {
      header: 'Colaborador',
      cell: (info) => {
        return (
          <span className="flex items-center gap-1">
            <Person className="h-5 w-5 text-[#000000] text-opacity-[56%]" />
            {info.getValue()}
          </span>
        )
      },
    }),
    columnHelper.accessor('email', {
      header: 'E-mail',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('active', {
      header: 'Status da conta',
      cell: (info) =>
        info.getValue() ? (
          <Chip label="Ativo" className="bg-[#2E7D324D]" />
        ) : (
          <Chip label="Inativo" />
        ),
    }),
    columnHelper.display({
      id: 'edit',
      cell: (info) => {
        return (
          <Button
            onClick={() => handleUpdateAdminNameDialogOpen(info.row.original)}
          >
            <MoreHoriz className="text-black" />
          </Button>
        )
      },
    }),
  ]

  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualFiltering: true,
  })

  const {
    execute: inactivateAdminAction,
    isPending: isInactivateAdminActionPending,
  } = useServerAction(inactivateAdminServerAction, {
    onSuccess: () => {
      const fetchData = async () => {
        const response = await getAdminsTableData({
          page,
          rowsPerPage,
          globalFilter,
          active: isActive,
        })

        if (globalFilter || isActive) {
          setPage(0)
        }

        setTableData(response.results)
        setRowTotalCount(response.total)
      }

      fetchData()
      handleUpdateAdminNameDialogClose()
    },
  })

  const {
    execute: reactivateAdminAction,
    isPending: isReactivateAdminActionPending,
  } = useServerAction(reactivateAdminServerAction, {
    onSuccess: () => {
      const fetchData = async () => {
        const response = await getAdminsTableData({
          page,
          rowsPerPage,
          globalFilter,
          active: isActive,
        })

        if (globalFilter || isActive) {
          setPage(0)
        }

        setTableData(response.results)
        setRowTotalCount(response.total)
      }

      fetchData()
      handleUpdateAdminNameDialogClose()
    },
  })

  const handleUpdateAdminNameDialogOpen = (rowData: AdminData) => {
    setSelectedRowData(rowData)
    setOpenUpdateAdminName(true)
  }

  const handleUpdateAdminNameDialogClose = () => {
    setOpenUpdateAdminName(false)
  }

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
      const response = await getAdminsTableData({
        page,
        rowsPerPage,
        globalFilter,
        active: isActive,
      })

      if (globalFilter || isActive) {
        setPage(0)
      }

      setTableData(response.results)
      setRowTotalCount(response.total)
    }

    fetchData()
  }, [page, rowsPerPage, globalFilter, isActive])

  return (
    <ThemeProvider theme={theme}>
      <Paper className="my-10 pt-4">
        <div className="mb-6 flex items-center gap-4 px-4">
          <TextField
            className="w-[300px]"
            label="Nome"
            placeholder="Insira o nome do colaborador"
            value={globalFilterInput}
            onChange={handleGlobalFilterChange}
          />

          <FormControl>
            <InputLabel id="active">Status</InputLabel>
            <Select
              labelId="active"
              label="Status"
              className="w-[180px]"
              defaultValue="all"
              onChange={(ev: SelectChangeEvent<string>) => {
                const value = ev.target.value
                if (value === 'all') {
                  setIsActive(null)
                } else {
                  setIsActive(value === 'active')
                }
              }}
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="active">Ativo</MenuItem>
              <MenuItem value="nonactive">Inativo</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            color="primary"
            component={Link}
            href="/register"
          >
            ADICIONAR ADMINISTRADOR
          </Button>
        </div>

        {tableData && tableData.length <= 0 && (
          <div className="flex h-96 items-center justify-center">
            <Card className="flex flex-col items-center gap-2 p-20">
              <span>
                <Search className="text-4xl text-[#E3A631]" />
              </span>

              <p className="text-center text-lg text-[#E3A631]">
                Nenhum administrador encontrado
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

      <Dialog
        open={openUpdateAdminName}
        onClose={handleUpdateAdminNameDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Colaborador (Editar)</DialogTitle>

        <DialogContent>
          <form action={''}>
            <FormControl className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <TextField
                  name="name"
                  label="Nome do colaborador"
                  type="text"
                  className="w-full"
                  variant="outlined"
                  placeholder="Insira um nome"
                  defaultValue={selectedRowData?.name}
                />

                {/* {updateActivityTypeError?.fieldErrors?.name && (
                  <p className="text-center text-sm italic text-red-500">
                    {updateActivityTypeError.fieldErrors.name}
                  </p>
                )} */}
              </div>
            </FormControl>

            <DialogActions className="-mb-2 mt-24 flex justify-between">
              {!selectedRowData?.active && (
                <Button
                  type="button"
                  variant="contained"
                  className="h-8 w-40 font-semibold"
                  disabled={isReactivateAdminActionPending}
                  onClick={() =>
                    reactivateAdminAction({
                      adminId: selectedRowData?.id || '',
                    })
                  }
                >
                  {isReactivateAdminActionPending ? (
                    <Refresh className="animate-spin" />
                  ) : (
                    'ATIVAR USUÁRIO'
                  )}
                </Button>
              )}

              {selectedRowData?.active && (
                <Button
                  type="button"
                  variant="contained"
                  className="h-8 w-44 font-semibold"
                  disabled={isInactivateAdminActionPending}
                  onClick={() =>
                    inactivateAdminAction({
                      adminId: selectedRowData?.id || '',
                    })
                  }
                >
                  {isInactivateAdminActionPending ? (
                    <Refresh className="animate-spin" />
                  ) : (
                    'INATIVAR USUÁRIO'
                  )}
                </Button>
              )}

              <div>
                <Button
                  onClick={handleUpdateAdminNameDialogClose}
                  className="mr-2 h-8 font-semibold"
                  variant="outlined"
                  color="error"
                >
                  Fechar
                </Button>

                <Button
                  type="submit"
                  className="h-8 w-24 font-semibold"
                  variant="contained"
                  color="primary"
                  disabled={false}
                >
                  {isActive ? ( // Rota de atualizar nome do admin não está pronta
                    <p>
                      <Refresh className="animate-spin" />
                    </p>
                  ) : (
                    'Salvar'
                  )}
                </Button>
              </div>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
}

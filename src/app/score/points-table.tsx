'use client'

import {
  DoNotDisturbAlt,
  MoreHoriz,
  Refresh,
  Search,
  WarningAmber,
} from '@mui/icons-material'
import {
  Button,
  Card,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  ThemeProvider,
} from '@mui/material'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ChangeEvent, useEffect, useState } from 'react'
import { RowDataType, PointsTableData } from './types'
import { useDebounce } from '@/utils/debounce/useDebounce'
import {
  createActivityTypeAction,
  getPointsTableData,
  updateActivityTypeAction,
} from './actions'
import { useServerAction } from 'zsa-react'
import { truncateText } from '@/utils/truncateText'

const theme = createTheme({
  palette: {
    primary: {
      main: '#E3A631',
    },
  },
})

const columnHelper = createColumnHelper<PointsTableData>()

export default function PointsTable() {
  const [selectedRowData, setSelectedRowData] = useState<RowDataType | null>(
    null,
  )

  const [createActivityTypeFormValue, setCreateActivityTypeFormValue] =
    useState({
      name: '',
      description: '',
      points: 0,
    })
  const [updateActivityTypeFormValue, setUpdateActivityTypeFormValue] =
    useState({
      name: '',
      description: '',
    })
  const [openCreatePoints, setOpenCreatePoints] = useState(false)
  const [openUpdatePoints, setOpenUpdatePoints] = useState(false)

  const [tableData, setTableData] = useState<PointsTableData[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [rowTotalCount, setRowTotalCount] = useState(0)
  const [globalFilterInput, setGlobalFilterInput] = useState('')
  const globalFilter = useDebounce(globalFilterInput, 300)

  const {
    executeFormAction: executeCreateActivityTypeAction,
    error: createActivityTypeError,
    isPending: isCreateActivityTypePending,
  } = useServerAction(createActivityTypeAction, {
    onSuccess: async () => {
      setCreateActivityTypeFormValue({
        name: '',
        description: '',
        points: 0,
      })

      const response = await getPointsTableData({
        page,
        rowsPerPage,
        globalFilter,
      })

      setTableData(response.results)
      setRowTotalCount(response.total)
    },
  })

  const {
    executeFormAction: executeUpdateActivityTypeAction,
    error: updateActivityTypeError,
    isPending: isUpdateActivityTypePending,
  } = useServerAction(updateActivityTypeAction, {
    bind: {
      activityTypeId: selectedRowData?.id ?? '',
    },
  })

  const columns = [
    columnHelper.accessor('name', {
      header: () => <span className="font-medium">Ação</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('points', {
      header: () => <span className="font-medium">Pontuação</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('description', {
      header: () => <span className="font-medium">Descrição</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: 'edit',
      cell: (info) => {
        const isDefaultActivitiesType =
          info.row.original.name === 'Indicação' ||
          info.row.original.name === 'Compra de produto'

        return (
          <Button
            className="disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => handleUpdatePointsDialogOpen(info.row.original)}
            disabled={isDefaultActivitiesType}
          >
            {isDefaultActivitiesType ? (
              <DoNotDisturbAlt className="text-black" />
            ) : (
              <MoreHoriz className="text-black" />
            )}
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

  const handleCreatePointsDialogOpen = () => {
    setOpenCreatePoints(true)
  }

  const handleCreatePointsDialogClose = () => {
    setOpenCreatePoints(false)
  }

  const handleUpdatePointsDialogOpen = (rowData: RowDataType) => {
    setSelectedRowData(rowData)
    setOpenUpdatePoints(true)
  }

  const handleUpdatePointsDialogClose = () => {
    setOpenUpdatePoints(false)
  }

  const handleCreateActivityTypeFormChange = (
    ev: ChangeEvent<HTMLInputElement>,
  ) => {
    setCreateActivityTypeFormValue({
      ...createActivityTypeFormValue,
      [ev.target.name]: ev.target.value,
    })
  }

  const handleUpdateActivityTypeFormChange = (
    ev: ChangeEvent<HTMLInputElement>,
  ) => {
    setUpdateActivityTypeFormValue({
      ...updateActivityTypeFormValue,
      [ev.target.name]: ev.target.value,
    })
  }

  useEffect(() => {
    const getData = async () => {
      const response = await getPointsTableData({
        page,
        rowsPerPage,
        globalFilter,
      })

      if (globalFilter) {
        setPage(0)
      }

      setTableData(response.results)
      setRowTotalCount(response.total)
    }

    getData()
  }, [page, rowsPerPage, globalFilter])

  return (
    <ThemeProvider theme={theme}>
      <div className="mb-20 mt-8">
        <div className="mb-14 flex w-full items-center gap-8">
          <FormControl className="flex w-fit flex-col gap-4">
            <TextField
              className="w-[300px]"
              type="text"
              name="globalFilterInput"
              variant="outlined"
              placeholder="Procurar pelo nome da ação"
              label="Nome da ação"
              value={globalFilterInput}
              onChange={handleGlobalFilterChange}
            />
          </FormControl>

          <Button
            type="button"
            variant="outlined"
            onClick={handleCreatePointsDialogOpen}
          >
            ADICIONAR REGRA DE PONTUAÇÃO
          </Button>

          <Dialog
            open={openCreatePoints}
            onClose={handleCreatePointsDialogClose}
          >
            <DialogTitle>Pontuação (Adicionar)</DialogTitle>
            <DialogContent>
              <form action={executeCreateActivityTypeAction}>
                <FormControl className="mt-2 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <TextField
                      label="Nome da ação"
                      name="name"
                      type="text"
                      placeholder="Insira o nome da ação"
                      value={createActivityTypeFormValue.name}
                      onChange={handleCreateActivityTypeFormChange}
                      variant="outlined"
                      className="w-[400px]"
                    />

                    {createActivityTypeError?.fieldErrors?.name && (
                      <p className="text-center text-sm italic text-red-500">
                        {createActivityTypeError.fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <TextField
                      name="points"
                      label="Pontos"
                      placeholder="Insira a quantidade de pontos"
                      value={createActivityTypeFormValue.points}
                      onChange={handleCreateActivityTypeFormChange}
                      variant="outlined"
                      className="w-[400px]"
                    />

                    {createActivityTypeError?.fieldErrors?.points && (
                      <p className="text-center text-sm italic text-red-500">
                        {createActivityTypeError.fieldErrors.points}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <TextField
                      name="description"
                      label="Descrição"
                      type="text"
                      placeholder="Insira uma descrição"
                      value={createActivityTypeFormValue.description}
                      onChange={handleCreateActivityTypeFormChange}
                      variant="outlined"
                      multiline
                      rows={5}
                      className="w-[400px]"
                    />

                    {createActivityTypeError?.fieldErrors?.description && (
                      <p className="text-center text-sm italic text-red-500">
                        {createActivityTypeError.fieldErrors.description}
                      </p>
                    )}
                  </div>
                </FormControl>
                <DialogActions className="-mb-2 mt-4">
                  <Button
                    onClick={handleCreatePointsDialogClose}
                    className="font-semibold"
                    variant="outlined"
                    color="error"
                  >
                    Fechar
                  </Button>
                  <Button
                    type="submit"
                    className="w-24 font-semibold"
                    variant="contained"
                    color="primary"
                    disabled={isCreateActivityTypePending}
                  >
                    {isCreateActivityTypePending ? (
                      <p>
                        <Refresh className="animate-spin" />
                      </p>
                    ) : (
                      'Salvar'
                    )}
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Paper>
          {tableData && tableData.length <= 0 && (
            <div className="flex h-96 items-center justify-center">
              <Card className="flex flex-col items-center gap-2 p-20">
                <span>
                  <Search className="text-4xl text-[#E3A631]" />
                </span>

                <p className="text-center text-lg text-[#E3A631]">
                  Nenhuma ação de pontuação encontrada
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
                        <TableCell
                          key={header.id}
                          className={`${header.id === 'points' ? 'w-48 text-center' : ''} ${header.id === 'name' ? 'w-36' : ''} ${header.id === 'description' ? 'w-36' : ''} ${header.id === 'edit' ? 'w-8' : ''}`}
                        >
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
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          className={` ${
                            cell.column.id === 'points'
                              ? 'w-[385px] text-center'
                              : ''
                          } ${cell.column.id === 'description' ? 'h-[80px] w-[260px]' : ''} ${cell.column.id === 'edit' ? 'w-[50px]' : ''} ${cell.column.id === 'action' ? 'w-[50px]' : ''} `}
                        >
                          {cell.column.id === 'description'
                            ? truncateText(String(cell.getValue()), 60)
                            : flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                        </TableCell>
                      )
                    })}
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

        <Dialog open={openUpdatePoints} onClose={handleUpdatePointsDialogClose}>
          <DialogTitle>Pontuação (Editar)</DialogTitle>
          <DialogContent>
            <div className="mx-auto flex w-72 flex-col items-center">
              <span>
                <WarningAmber color="primary" />
              </span>

              <p className="text-center text-sm text-[#E3A631]">
                Usuários que já receberam a pontuação não serão afetados por
                essa alteração
              </p>
            </div>

            <form action={executeUpdateActivityTypeAction}>
              <FormControl className="mt-6 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <TextField
                    name="name"
                    label="Nome da ação"
                    type="text"
                    className="w-[400px]"
                    variant="outlined"
                    placeholder="Consulta"
                    defaultValue={selectedRowData?.name}
                    onChange={handleUpdateActivityTypeFormChange}
                  />

                  {updateActivityTypeError?.fieldErrors?.name && (
                    <p className="text-center text-sm italic text-red-500">
                      {updateActivityTypeError.fieldErrors.name}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <TextField
                    name="points"
                    className="w-40"
                    variant="outlined"
                    label="Pontos"
                    type="text"
                    placeholder="Insira a quantidade de pontos"
                    defaultValue={selectedRowData?.points}
                    onChange={handleUpdateActivityTypeFormChange}
                  />

                  {updateActivityTypeError?.fieldErrors?.points && (
                    <p className="text-start text-sm italic text-red-500">
                      {updateActivityTypeError.fieldErrors.points}
                    </p>
                  )}
                </div>
              </FormControl>

              <DialogActions className="-mb-2 mt-4">
                <Button
                  onClick={handleUpdatePointsDialogClose}
                  className="font-semibold"
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
                  disabled={isUpdateActivityTypePending}
                >
                  {isUpdateActivityTypePending ? (
                    <p>
                      <Refresh className="animate-spin" />
                    </p>
                  ) : (
                    'Salvar'
                  )}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </ThemeProvider>
  )
}

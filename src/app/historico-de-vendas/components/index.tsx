'use client'

import {
  createTheme,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  ThemeProvider,
} from '@mui/material'
import { ptBR } from '@mui/material/locale'
import {
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { HistorySellsProps, Purchase } from '../types'
import SellsForm from './SellsForm'

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

const columnHelper = createColumnHelper<Purchase>()

const columns = [
  columnHelper.accessor('id', {
    header: 'ID do Produto',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('total_amount', {
    header: 'Valor',
    cell: (info) => `R$ ${info.getValue().toLocaleString('pt-BR')}`,
  }),
  columnHelper.accessor('date', {
    header: 'Data da Venda',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('', {
    header: 'Cliente',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('complement', {
    header: 'Endereço',
    cell: (info) => info.getValue(),
  }),
]

export function HistorySells({ data }: HistorySellsProps) {
  console.log('HistorySells', data)

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedItem, setSelectedItem] = useState<Purchase | null>(null)
  const [rowMenuTarget, setRowMenuTarget] = useState<Purchase | null>(null)

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
      pagination,
    },
  })

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    row: Purchase,
  ) => {
    setRowMenuTarget(row)
    setMenuAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setMenuAnchorEl(null)
    setRowMenuTarget(null)
  }

  const handleViewDetails = () => {
    if (rowMenuTarget) {
      setSelectedItem(rowMenuTarget)
    }
    handleCloseMenu()
  }

  if (selectedItem)
    return (
      <SellsForm
        selectedItem={{
          product: selectedItem.purchase_items,
          value: selectedItem.total_amount,
          saleDate: selectedItem.created_at,
          client: selectedItem.status,
          address: selectedItem.complement,
        }}
      />
    )

  return (
    <ThemeProvider theme={theme}>
      <Paper className="my-10 pt-4">
        <div>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id}>
                      {header.column.columnDef.header}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell: any) => {
                    return (
                      <TableCell key={cell.id}>
                        {cell.id.includes('date')
                          ? new Date(cell.getValue()).toLocaleDateString(
                              'pt-BR',
                              {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                              },
                            ) +
                            ' ' +
                            new Date(cell.getValue()).toLocaleTimeString(
                              'pt-BR',
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                              },
                            )
                          : cell.id.includes('total_amount')
                            ? `R$ ${Number(cell.getValue()).toLocaleString(
                                'pt-BR',
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                },
                              )}`
                            : cell.renderValue()}
                      </TableCell>
                    )
                  })}
                  <TableCell>
                    <button
                      onClick={(event) => handleOpenMenu(event, row.original)}
                    >
                      <svg
                        width="16"
                        height="4"
                        viewBox="0 0 16 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.99997 4C1.44997 4 0.979136 3.80417 0.58747 3.4125C0.195803 3.02083 -3.05176e-05 2.55 -3.05176e-05 2C-3.05176e-05 1.45 0.195803 0.979167 0.58747 0.5875C0.979136 0.195833 1.44997 0 1.99997 0C2.54997 0 3.0208 0.195833 3.41247 0.5875C3.80414 0.979167 3.99997 1.45 3.99997 2C3.99997 2.55 3.80414 3.02083 3.41247 3.4125C3.0208 3.80417 2.54997 4 1.99997 4ZM7.99997 4C7.44997 4 6.97914 3.80417 6.58747 3.4125C6.1958 3.02083 5.99997 2.55 5.99997 2C5.99997 1.45 6.1958 0.979167 6.58747 0.5875C6.97914 0.195833 7.44997 0 7.99997 0C8.54997 0 9.0208 0.195833 9.41247 0.5875C9.80414 0.979167 9.99997 1.45 9.99997 2C9.99997 2.55 9.80414 3.02083 9.41247 3.4125C9.0208 3.80417 8.54997 4 7.99997 4ZM14 4C13.45 4 12.9791 3.80417 12.5875 3.4125C12.1958 3.02083 12 2.55 12 2C12 1.45 12.1958 0.979167 12.5875 0.5875C12.9791 0.195833 13.45 0 14 0C14.55 0 15.0208 0.195833 15.4125 0.5875C15.8041 0.979167 16 1.45 16 2C16 2.55 15.8041 3.02083 15.4125 3.4125C15.0208 3.80417 14.55 4 14 4Z"
                          fill="#1C1B1F"
                        />
                      </svg>
                    </button>
                    <Menu
                      anchorEl={menuAnchorEl}
                      open={Boolean(menuAnchorEl)}
                      onClose={handleCloseMenu}
                    >
                      <MenuItem onClick={handleViewDetails}>
                        <svg
                          width="16"
                          height="15"
                          viewBox="0 0 16 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className='mr-1'
                        >
                          <path
                            d="M13.8333 13.3333H2.16667V1.66667H8V0H2.16667C1.24167 0 0.5 0.75 0.5 1.66667V13.3333C0.5 14.25 1.24167 15 2.16667 15H13.8333C14.75 15 15.5 14.25 15.5 13.3333V7.5H13.8333V13.3333ZM9.66667 0V1.66667H12.6583L4.46667 9.85833L5.64167 11.0333L13.8333 2.84167V5.83333H15.5V0H9.66667Z"
                            fill="#625B71"
                          />
                        </svg>
                        Ver detalhes
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          component="div"
          count={table.getRowCount()}
          page={pagination.pageIndex}
          onPageChange={(event, newPage) =>
            setPagination((prev) => ({ ...prev, pageIndex: newPage }))
          }
          rowsPerPage={pagination.pageSize}
          onRowsPerPageChange={(event) =>
            setPagination((prev) => ({
              ...prev,
              pageSize: parseInt(event.target.value, 10),
            }))
          }
        />
      </Paper>
    </ThemeProvider>
  )
}

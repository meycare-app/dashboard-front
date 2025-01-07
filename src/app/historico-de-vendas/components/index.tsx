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
import { HistorySellsProps, UserType } from '../types'
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

const columnHelper = createColumnHelper<UserType>()

const columns = [
  columnHelper.accessor('product', {
    header: 'Produto',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('value', {
    header: 'Valor',
    cell: (info) => `R$ ${info.getValue()}`,
  }),
  columnHelper.accessor('saleDate', {
    header: 'Data da Venda',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('client', {
    header: 'Cliente',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('address', {
    header: 'Endereço',
    cell: (info) => info.getValue(),
  }),
]

export function HistorySells({ data }: HistorySellsProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedItem, setSelectedItem] = useState<UserType | null>(null)
  const [rowMenuTarget, setRowMenuTarget] = useState<UserType | null>(null)

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
    row: UserType,
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
          product: selectedItem.product,
          value: selectedItem.value,
          saleDate: selectedItem.saleDate,
          client: selectedItem.client,
          address: selectedItem.address,
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
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{cell.renderValue()}</TableCell>
                  ))}
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
                      <MenuItem onClick={handleViewDetails}>Ver</MenuItem>
                      <MenuItem onClick={handleCloseMenu}>Editar</MenuItem>
                      <MenuItem onClick={handleCloseMenu}>Excluir</MenuItem>
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

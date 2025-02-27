import React, { useState } from 'react'
import {
  createTheme,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Select,
  MenuItem as DropdownItem,
  Button,
  ThemeProvider,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import { ptBR } from '@mui/material/locale'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import MoreVertIcon from '@mui/icons-material/MoreVert'

type Product = {
  id: number
  name: string
  description: string
  value: number
  stock: number
}

type ProductListProps = {
  data: Product[]
}

export default function ProductList({ data }: ProductListProps) {
  const [search, setSearch] = useState('')
  const [valueRange, setValueRange] = useState<string>('')
  const [dateRange, setDateRange] = useState<string>('')

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      header: 'Produto',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'description',
      header: 'Descrição',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'value',
      header: 'Valor (Real/Pontos)',
      cell: (info) => {
        const val = info.getValue<number>()
        return `R$${val} / 5000 pontos`
      },
    },
    {
      accessorKey: 'stock',
      header: 'Estoque',
      cell: (info) => {
        const val = info.getValue<number>()
        return `${val} unidades`
      },
    },
    {
      id: 'actions',
      header: '',
      cell: ActionsCell,
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const handleFilter = () => {
    setColumnFilters([
      {
        id: 'name',
        value: search,
      },
    ])

    console.log('Filtro de valores:', valueRange)
    console.log('Filtro de datas:', dateRange)
  }

  const theme = createTheme({}, ptBR)

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <TextField
            label="Buscar pelo produto"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ minWidth: 200 }}
          />

          <Select
            displayEmpty
            size="small"
            value={valueRange}
            onChange={(e) => setValueRange(e.target.value)}
            style={{ minWidth: 200 }}
          >
            <DropdownItem value="">
              <em>Selecione o intervalo de valores</em>
            </DropdownItem>
            <DropdownItem value="baixo">Até R$500</DropdownItem>
            <DropdownItem value="medio">R$500 - R$3000</DropdownItem>
            <DropdownItem value="alto">Acima de R$3000</DropdownItem>
          </Select>

          <Select
            displayEmpty
            size="small"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{ minWidth: 200 }}
          >
            <DropdownItem value="">
              <em>Selecione o intervalo de datas</em>
            </DropdownItem>
            <DropdownItem value="ultimos7">Últimos 7 dias</DropdownItem>
            <DropdownItem value="ultimos30">Últimos 30 dias</DropdownItem>
            <DropdownItem value="ultimos90">Últimos 90 dias</DropdownItem>
          </Select>

          <Button variant="contained" onClick={handleFilter}>
            FILTRAR
          </Button>
        </div>

        <Table stickyHeader>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={data.length}
          page={table.getState().pagination.pageIndex}
          rowsPerPage={table.getState().pagination.pageSize}
          onPageChange={(_event, newPage) => table.setPageIndex(newPage)}
          onRowsPerPageChange={(event) => {
            table.setPageSize(parseInt(event.target.value, 10))
          }}
        />
      </Paper>
    </ThemeProvider>
  )
}

function ActionsCell() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Editar</MenuItem>
        <MenuItem onClick={handleClose}>Excluir</MenuItem>
        <MenuItem onClick={handleClose}>Atualizar estoque</MenuItem>
      </Menu>
    </>
  )
}

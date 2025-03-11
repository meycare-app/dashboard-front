import React, { useState, useEffect, useMemo } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  MenuItem,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import TextInput from '@/components/mui/TextInput'
import MyButton from '@/components/mui/Button'

type Product = {
  id: string
  name: string
  description: string
  price: number
  stock: number
  points: number
}

export default function ProductList() {
  const [search, setSearch] = useState('')
  const [valueRange, setValueRange] = useState<string>('')
  const [dateRange, setDateRange] = useState<string>('')

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) return
    const fetchProducts = async () => {
      setLoading(true)
      const init = pagination.pageIndex * pagination.pageSize
      const limit = pagination.pageSize
      try {
        const res = await fetch(
          `http://3.225.87.60:3000/admin/products?init=${init}&limit=${limit}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${session.user.token}`,
            },
          },
        )
        const json = await res.json()
        setProducts(json.results)
        setTotal(json.total)
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [pagination.pageIndex, pagination.pageSize, session])

  const minValue = useMemo(
    () =>
      products?.length ? Math.min(...products.map((item) => item.price)) : 0,
    [products],
  )
  const maxValue = useMemo(
    () =>
      products?.length ? Math.max(...products.map((item) => item.price)) : 0,
    [products],
  )

  const intervals = useMemo(() => {
    const range = maxValue - minValue
    const firstThreshold = minValue + range / 3
    const secondThreshold = minValue + (2 * range) / 3
    return [
      {
        value: 'low',
        label: `Até R$ ${firstThreshold.toFixed(2)}`,
        min: minValue,
        max: firstThreshold,
      },
      {
        value: 'medium',
        label: `R$ ${firstThreshold.toFixed(2)} - R$ ${secondThreshold.toFixed(2)}`,
        min: firstThreshold,
        max: secondThreshold,
      },
      {
        value: 'high',
        label: `Acima de R$ ${secondThreshold.toFixed(2)}`,
        min: secondThreshold,
        max: maxValue,
      },
    ]
  }, [minValue, maxValue])

  const handleFilter = () => {
    const filters = [{ id: 'name', value: search }]
    if (valueRange) {
      const selectedInterval = intervals.find(
        (interval) => interval.value === valueRange,
      )
      if (selectedInterval) {
        filters.push({
          id: 'price',
          value: [selectedInterval.min, selectedInterval.max],
        })
      }
    }
    setColumnFilters(filters)
  }

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
      accessorKey: 'price',
      header: 'Valor (Real/Pontos)',
      cell: (info) => {
        const price = info.getValue<number>()
        const row = info.row.original as Product
        return `R$${price} / ${row.points} pontos`
      },
      filterFn: (row, columnId, filterValue: [number, number]) => {
        const rowPrice = row.getValue<number>(columnId)
        return rowPrice >= filterValue[0] && rowPrice <= filterValue[1]
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
      cell: (info) => <ActionsCell row={info.row} />,
    },
  ]

  const table = useReactTable({
    data: products,
    columns,
    state: { sorting, columnFilters, pagination },
    manualPagination: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <>
      <div className="relative mt-8 flex flex-wrap items-center gap-4">
        <div className="relative">
          <label className="absolute left-5 top-[-9px] bg-white px-2 text-xs font-medium text-gray-700">
            Produto
          </label>
          <input
            type="text"
            placeholder="Buscar pelo produto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[310px] rounded-lg border border-gray-300 p-3 text-gray-700 shadow-sm outline-none"
          />
        </div>

        <div className="relative">
          <label className="absolute left-5 top-[-9px] bg-white px-2 text-xs font-medium text-gray-700">
            Valor
          </label>
          <select
            value={valueRange}
            onChange={(e) => setValueRange(e.target.value)}
            className="w-[310px] rounded-lg border border-gray-300 p-3 text-gray-700 shadow-sm outline-none"
          >
            <option value="">Selecione o intervalo de valores</option>
            {intervals.map((interval) => (
              <option key={interval.value} value={interval.value}>
                {interval.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label className="absolute left-5 top-[-9px] bg-white px-2 text-xs font-medium text-gray-700">
            Data
          </label>
          <input
            type="date"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-[310px] rounded-lg border border-gray-300 p-3 text-gray-700 shadow-sm outline-none"
          />
        </div>

        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.249995 1.61C2.26999 4.2 5.99999 9 5.99999 9V15C5.99999 15.55 6.44999 16 6.99999 16H9C9.55 16 10 15.55 10 15V9C10 9 13.72 4.2 15.74 1.61C16.25 0.95 15.78 0 14.95 0H1.03999C0.209995 0 -0.260005 0.95 0.249995 1.61Z"
            fill="black"
            fillOpacity="0.56"
          />
        </svg>

        <div className="flex h-full">
          <button
            onClick={handleFilter}
            className="h-10 self-end rounded-lg bg-yellow-600 px-6 py-2 font-medium text-white shadow-md transition hover:bg-yellow-700"
          >
            FILTRAR
          </button>
        </div>
      </div>

      <Paper className="my-10 pt-4">
        {loading ? (
          <div className="p-4 text-center">Carregando produtos...</div>
        ) : (
          <>
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

            <TablePagination
              component="div"
              count={total}
              page={table.getState().pagination.pageIndex}
              rowsPerPage={table.getState().pagination.pageSize}
              onPageChange={(_event, newPage) => table.setPageIndex(newPage)}
              onRowsPerPageChange={(event) => {
                table.setPageSize(parseInt(event.target.value, 10))
              }}
            />
          </>
        )}
      </Paper>
    </>
  )
}

type ActionsCellProps = {
  row: Row<Product>
}

function ActionsCell({ row }: ActionsCellProps) {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [newStock, setNewStock] = useState('')

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    handleClose()
    router.push(`/products/edit-product/${row.original.id}`)
  }

  const handleOpenUpdateModal = () => {
    handleClose()
    setOpenUpdateModal(true)
  }

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false)
    setNewStock('')
  }

  const handleUpdateStock = async () => {
    const formData = new FormData()
    formData.append('stock', newStock)

    try {
      const res = await fetch(
        `http://3.225.87.60:3000/admin/products/${row.original.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NGEwZThhOS1kZjMxLTQwOWMtYmM1Zi1jZTFiNzA3YWMxNzMiLCJpYXQiOjE3NDE2NTUyNDAsImV4cCI6MTc0MTY2OTY0MH0.g7bSxzHUV8_hgzYSDhFBheEIPfOzpf2UOFJ3CZmEPSc`,
          },
          body: formData,
        },
      )
      if (!res.ok) {
        console.error('Erro ao atualizar o estoque')
      } else {
        console.log('Estoque atualizado com sucesso')
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
    } finally {
      handleCloseUpdateModal()
    }
  }

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleEdit} className="flex gap-2">
          <svg
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.71563 5.01667L10.4823 5.78333L2.9323 13.3333H2.16563V12.5667L9.71563 5.01667ZM12.7156 0C12.5073 0 12.2906 0.0833333 12.1323 0.241667L10.6073 1.76667L13.7323 4.89167L15.2573 3.36667C15.5823 3.04167 15.5823 2.51667 15.2573 2.19167L13.3073 0.241667C13.1406 0.075 12.9323 0 12.7156 0ZM9.71563 2.65833L0.498962 11.875V15H3.62396L12.8406 5.78333L9.71563 2.65833Z"
              fill="#625B71"
            />
          </svg>
          Editar
        </MenuItem>
        <MenuItem onClick={handleOpenUpdateModal} className="flex gap-2">
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.97498 19V16H5.07498L2.52498 7.65002C2.07498 7.40002 1.70414 7.03336 1.41248 6.55002C1.12081 6.06669 0.974976 5.55002 0.974976 5.00002C0.974976 4.16669 1.26664 3.45836 1.84998 2.87502C2.43331 2.29169 3.14164 2.00002 3.97498 2.00002C4.62498 2.00002 5.20414 2.18752 5.71248 2.56252C6.22081 2.93752 6.57498 3.41669 6.77498 4.00002H9.97498V3.00002C9.97498 2.71669 10.0708 2.47919 10.2625 2.28752C10.4541 2.09586 10.6916 2.00002 10.975 2.00002C11.125 2.00002 11.2708 2.03336 11.4125 2.10002C11.5541 2.16669 11.675 2.26669 11.775 2.40002L13.475 0.800023C13.625 0.650023 13.8041 0.55419 14.0125 0.512523C14.2208 0.470856 14.425 0.500023 14.625 0.600023L18.525 2.40002C18.725 2.50002 18.8625 2.64586 18.9375 2.83752C19.0125 3.02919 19.0083 3.21669 18.925 3.40002C18.825 3.60002 18.6791 3.72919 18.4875 3.78752C18.2958 3.84586 18.1083 3.83336 17.925 3.75002L14.325 2.10002L11.975 4.30002V5.70002L14.325 7.85002L17.925 6.20002C18.1083 6.11669 18.3 6.10836 18.5 6.17502C18.7 6.24169 18.8416 6.36669 18.925 6.55002C19.025 6.75002 19.0333 6.94169 18.95 7.12502C18.8666 7.30836 18.725 7.45002 18.525 7.55002L14.625 9.40002C14.425 9.50002 14.2208 9.52919 14.0125 9.48752C13.8041 9.44586 13.625 9.35002 13.475 9.20002L11.775 7.60002C11.675 7.70002 11.5541 7.79169 11.4125 7.87502C11.2708 7.95836 11.125 8.00002 10.975 8.00002C10.6916 8.00002 10.4541 7.90419 10.2625 7.71252C10.0708 7.52086 9.97498 7.28336 9.97498 7.00002V6.00002H6.77498C6.72498 6.13336 6.67081 6.25836 6.61248 6.37502C6.55414 6.49169 6.47498 6.61669 6.37498 6.75002L11.375 16H14.975V19H1.97498ZM3.97498 6.00002C4.25831 6.00002 4.49581 5.90419 4.68748 5.71252C4.87914 5.52086 4.97498 5.28336 4.97498 5.00002C4.97498 4.71669 4.87914 4.47919 4.68748 4.28752C4.49581 4.09586 4.25831 4.00002 3.97498 4.00002C3.69164 4.00002 3.45414 4.09586 3.26248 4.28752C3.07081 4.47919 2.97498 4.71669 2.97498 5.00002C2.97498 5.28336 3.07081 5.52086 3.26248 5.71252C3.45414 5.90419 3.69164 6.00002 3.97498 6.00002ZM7.12498 16H9.07498L4.77498 8.00002H4.67498L7.12498 16Z"
              fill="#625B71"
            />
          </svg>
          Atualizar estoque
        </MenuItem>
      </Menu>
      <Dialog
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        disablePortal
      >
        <DialogTitle>Atualizar Estoque</DialogTitle>
        <DialogContentText className="mx-8">
          Aqui você pode atualizar o estoque do item!
        </DialogContentText>
        <DialogContent>
          <TextInput
            type="number"
            onChange={(e) => setNewStock(e.target.value)}
            label="Quantidade em estoque"
            value={newStock}
          />
        </DialogContent>
        <DialogActions>
          <MyButton
            category="destructive"
            outlined
            onClick={handleCloseUpdateModal}
          >
            FECHAR
          </MyButton>
          <MyButton onClick={handleUpdateStock}>SALVAR</MyButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

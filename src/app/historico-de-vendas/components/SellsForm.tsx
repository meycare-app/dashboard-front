import { Divider } from '@mui/material'

interface SellsFormProps {
  selectedItem: {
    product: string
    value: number
    saleDate: string
    client: string
    address: string
  }
}

export default function SellsForm({ selectedItem }: SellsFormProps) {
  return (
    <div className="mx-auto w-full rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6">
        <label className="block font-medium text-gray-700">Cliente</label>
        <p className="rounded-md bg-gray-100 p-2">{selectedItem.client}</p>
      </div>

      <div className="mb-6">
        <label className="block font-medium text-gray-700">
          Nome do produto
        </label>
        <p className="rounded-md bg-gray-100 p-2">{selectedItem.product}</p>
      </div>

      <div className="mb-6">
        <label className="block font-medium text-gray-700">Data da venda</label>
        <p className="rounded-md bg-gray-100 p-2">{selectedItem.saleDate}</p>
      </div>

      <div className="mb-6">
        <label className="block font-medium text-gray-700">Endereço</label>
        <p className="rounded-md bg-gray-100 p-2">{selectedItem.address}</p>
      </div>

      <h2 className="mb-4 mt-8 text-xl font-semibold">Valores</h2>
      <Divider className="mb-4" />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-gray-700">
            Valor em pontos
          </label>
          <p className="rounded-md bg-gray-100 p-2">{selectedItem.value}</p>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Valor em reais
          </label>
          <p className="rounded-md bg-gray-100 p-2">
            R$ {selectedItem.value.toLocaleString('pt-BR')}
          </p>
        </div>
        <div className="col-span-2">
          <label className="block font-medium text-gray-700">
            Premiação em pontos
          </label>
          <p className="rounded-md bg-gray-100 p-2">
            {selectedItem.value} pontos
          </p>
        </div>
      </div>
    </div>
  )
}

'use client'
import ProductForm from '../components/ProductForm'
import { HandleProductProps } from '../edit-product/[id]/page'

export default function AddProduct() {
  const handleCreate = async ({ formData, token }: HandleProductProps) => {
    const response = await fetch(`${process.env.API_URL}/admin/products`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
    if (!response.ok) {
      throw new Error('Erro ao criar o produto.')
    }
    return response.json()
  }

  return (
    <ProductForm
      onSubmit={handleCreate}
      successMessage="Produto criado com sucesso"
    />
  )
}

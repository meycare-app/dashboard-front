'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ProductForm from '../../components/ProductForm'
import { useSession } from 'next-auth/react'

type ProductData = {
  name: string
  description: string
  points: string
  price: string
  stock: string
  height: string
  width: string
  length: string
  weight: string
  image: File | null
}

export type HandleProductProps = {
  formData: FormData
  token: string
}

export default function EditProduct() {
  const { id } = useParams()
  const [initialData, setInitialData] = useState<ProductData | null>(null)
  const { data: session } = useSession()

  useEffect(() => {
    if (id) {
      fetch(`http://3.225.87.60:3000/admin/product/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setInitialData({
            name: data.name,
            description: data.description,
            points: data.points.toString(),
            price: data.price.toString(),
            stock: data.stock.toString(),
            height: data.height.toString(),
            width: data.width.toString(),
            length: data.length.toString(),
            weight: data.weight.toString(),
            image: null,
          })
        })
        .catch(console.error)
    }
  }, [id, session])

  const handleUpdate = async ({ formData, token }: HandleProductProps) => {
    const response = await fetch(
      `http://3.225.87.60:3000/admin/products/${id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    )
    if (!response.ok) {
      throw new Error('Erro ao atualizar o produto.')
    }
    return response.json()
  }

  if (!initialData) return <p>Carregando...</p>

  return (
    <ProductForm
      initialData={initialData}
      onSubmit={handleUpdate}
      successMessage="Produto atualizado com sucesso!"
    />
  )
}

'use client'
import React, { useState } from 'react'
import { Navbar } from '@/components/menu/Navbar'
import { Divider } from '@mui/material'
import MyButton from '@/components/mui/Button'
import TextInput from '@/components/mui/TextInput'
import ImageInput from '@/components/mui/ImageInput'
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

type ProductFormProps = {
  initialData?: ProductData
  onSubmit: (data: { formData: FormData; token: string }) => Promise<void>
  successMessage?: string
}

export default function ProductForm({
  initialData,
  onSubmit,
  successMessage = '',
}: ProductFormProps) {
  const [name, setName] = useState(initialData?.name || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [points, setpoints] = useState(initialData?.points || '')
  const [price, setprice] = useState(initialData?.price || '')
  const [stock, setStock] = useState(initialData?.stock || '')
  const [height, setHeight] = useState(initialData?.height || '')
  const [width, setWidth] = useState(initialData?.width || '')
  const [length, setLength] = useState(initialData?.length || '')
  const [weight, setWeight] = useState(initialData?.weight || '')
  const [image, setImage] = useState<File | null>(initialData?.image || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState('')
  const { data: session } = useSession()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('points', points)
    formData.append('price', (Number(price) * 100).toString())
    formData.append('stock', stock)
    formData.append('height', height)
    formData.append('width', width)
    formData.append('length', length)
    formData.append('weight', weight)
    if (image) {
      formData.append('image', image)
    }

    if (session?.user?.token == null) {
      throw new Error('Token não encontrado')
    }

    try {
      setLoading(true)
      setError(null)
      setSuccess('')
      await onSubmit({ formData, token: session.user.token })
      setSuccess(successMessage)
    } catch (err: any) {
      console.error('Erro:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto mt-8 w-4/5">
        <div>
          <h1 className="mb-2 mt-32 text-4xl">
            {initialData ? 'Editar Produto' : 'Adicionar Produto'}
          </h1>
          <Divider />
        </div>
        <form onSubmit={handleSubmit} className="my-14 flex flex-col gap-6">
          <div className="w-1/2">
            <TextInput
              type="text"
              placeholder="Insira o nome do produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Nome do produto"
            />
          </div>
          <div className="w-full border">
            <TextInput
              type="text"
              placeholder="Insira a descrição do produto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Descrição do produto"
              multiline
              rows={4}
            />
          </div>
          <h2 className="text-lg font-semibold">
            Valores
            <Divider />
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <TextInput
                type="number"
                placeholder="Insira o valor em pontos"
                value={points}
                onChange={(e) => setpoints(e.target.value)}
                label="Valor em pontos"
              />
            </div>
            <div>
              <TextInput
                type="number"
                placeholder="Insira o valor em reais (R$)"
                value={price}
                onChange={(e) => setprice(e.target.value)}
                label="Valor em reais (R$)"
              />
            </div>
          </div>
          <h2 className="text-lg font-semibold">
            Informações Adicionais
            <Divider />
          </h2>
          <div className="w-1/3">
            <TextInput
              type="number"
              placeholder="Insira a quantidade em unidades"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              label="Quantidade em estoque"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/4">
              <TextInput
                type="text"
                placeholder="Insira a altura"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                label="Altura"
              />
            </div>
            <div className="w-1/4">
              <TextInput
                type="text"
                placeholder="Insira a largura"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                label="Largura"
              />
            </div>
            <div className="w-1/4">
              <TextInput
                type="text"
                placeholder="Insira o comprimento"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                label="Comprimento"
              />
            </div>
            <div className="w-1/4">
              <TextInput
                type="text"
                placeholder="Insira o peso"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                label="Peso"
              />
            </div>
          </div>
          <h2 className="text-lg font-semibold">
            Imagem
            <Divider />
          </h2>
          <div className="w-1/2">
            <ImageInput
              label="Selecione a imagem do produto"
              accept=".png,.jpg"
              value={image}
              onChange={(file) => setImage(file)}
              maxSizeMB={20}
            />
          </div>
          {error && <p className="text-red-500">Erro: {error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <MyButton type="submit" className="max-w-[300px]" disabled={loading}>
            {loading
              ? 'Salvando...'
              : initialData
                ? 'ATUALIZAR PRODUTO'
                : 'SALVAR PRODUTO'}
          </MyButton>
        </form>
      </main>
    </>
  )
}

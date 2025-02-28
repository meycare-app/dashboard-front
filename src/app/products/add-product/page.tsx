'use client'
import React, { useState } from 'react'
import { Navbar } from '@/components/menu/Navbar'
import { Divider } from '@mui/material'
import MyButton from '@/components/mui/Button'

export default function AddProduct() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [valuePoints, setValuePoints] = useState('')
  const [valueReais, setValueReais] = useState('')
  const [stock, setStock] = useState('')
  const [height, setHeight] = useState('')
  const [width, setWidth] = useState('')
  const [length, setLength] = useState('')
  const [weight, setWeight] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newProduct = {
      name,
      description,
      valuePoints,
      valueReais,
      stock,
      height,
      width,
      length,
      weight,
      image,
    }

    console.log('Produto a ser salvo:', newProduct)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0])
    }
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto mt-8 w-4/5">
        <div>
          <h1 className="mb-2 mt-32 text-4xl font-bold">Produtos</h1>
          <Divider />
        </div>

        <div className="mx-auto max-w-2xl p-4">
          <h1 className="mb-6 text-xl font-bold">Adicionar Produto</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Nome do produto
              </label>
              <input
                type="text"
                placeholder="Insira o nome do produto"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Descrição do produto
              </label>
              <textarea
                placeholder="Insira a descrição do produto"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded border p-2"
                rows={3}
              />
            </div>

            <h2 className="text-lg font-semibold">Valores</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Valor em pontos
                </label>
                <input
                  type="number"
                  placeholder="Insira o valor em pontos"
                  value={valuePoints}
                  onChange={(e) => setValuePoints(e.target.value)}
                  className="w-full rounded border p-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Valor em reais (R$)
                </label>
                <input
                  type="number"
                  placeholder="Insira o valor em reais"
                  value={valueReais}
                  onChange={(e) => setValueReais(e.target.value)}
                  className="w-full rounded border p-2"
                />
              </div>
            </div>

            <h2 className="text-lg font-semibold">Informações Adicionais</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Quantidade em estoque
                </label>
                <input
                  type="number"
                  placeholder="Insira a quantidade em unidades"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full rounded border p-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Altura</label>
                <input
                  type="text"
                  placeholder="Insira a altura"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full rounded border p-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Largura
                </label>
                <input
                  type="text"
                  placeholder="Insira a largura"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full rounded border p-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Comprimento
                </label>
                <input
                  type="text"
                  placeholder="Insira o comprimento"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full rounded border p-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Peso</label>
                <input
                  type="text"
                  placeholder="Insira o peso"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full rounded border p-2"
                />
              </div>
            </div>

            <h2 className="text-lg font-semibold">Imagem</h2>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Selecione a imagem do produto
              </label>
              <input
                type="file"
                accept=".svg,.png,.jpg"
                onChange={handleImageChange}
                className="block w-full cursor-pointer text-sm text-slate-500 file:mr-4 file:rounded file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:bg-gray-200"
              />
              <p className="mt-1 text-xs text-gray-500">
                SVG, PNG, JPG (max. 3MB)
              </p>
            </div>

            <MyButton type="submit">SALVAR PRODUTO</MyButton>
          </form>
        </div>
      </main>
    </>
  )
}

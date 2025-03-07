'use client'
import React, { useState } from 'react'
import { Navbar } from '@/components/menu/Navbar'
import { Divider } from '@mui/material'
import MyButton from '@/components/mui/Button'
import TextInput from '@/components/mui/TextInput'
import ImageInput from '@/components/mui/ImageInput'

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

  return (
    <>
      <Navbar />
      <main className="mx-auto mt-8 w-4/5">
        <div>
          <h1 className="mb-2 mt-32 text-4xl">Adicionar Produto</h1>
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
                value={valuePoints}
                onChange={(e) => setValuePoints(e.target.value)}
                label="Valor em pontos"
              />
            </div>

            <div>
              <TextInput
                type="number"
                placeholder="Insira o valor em reais (R$)"
                value={valueReais}
                onChange={(e) => setValueReais(e.target.value)}
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
              accept=".svg,.png,.jpg"
              value={image}
              onChange={(file) => setImage(file)}
              maxSizeMB={3}
            />
          </div>

          <MyButton type="submit" className="max-w-[300px]">
            SALVAR PRODUTO
          </MyButton>
        </form>
      </main>
    </>
  )
}

'use client'
import { Divider } from '@mui/material'
import ProductList from './components'
import { Navbar } from '@/components/menu/Navbar'
import { useRouter } from 'next/navigation'
import MyButton from '@/components/mui/Button'

export default function ProductPage() {
  const router = useRouter()

  const handleAddProduct = () => {
    router.push('/products/add-product')
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto mt-8 w-4/5">
        <div>
          <div className="absolute right-[150px] border">
            <MyButton outlined onClick={handleAddProduct}>
              ADICIONAR PRODUTO
            </MyButton>
          </div>
          <h1 className="mb-2 mt-32 text-4xl">Produtos</h1>
          <Divider />
        </div>
        <ProductList />
      </main>
    </>
  )
}

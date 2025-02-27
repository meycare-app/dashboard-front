'use client'
import { Divider } from '@mui/material'
import ProductList from './components'

export default function ProductPage() {
  const mockData = [
    {
      id: 1,
      name: 'Smartphone Galaxy S21',
      description:
        'Smartphone Samsung Galaxy S21 com tela de 6.2 polegadas, 128GB de armazenamento e câmera tripla.',
      value: 3500,
      stock: 15,
    },
    {
      id: 2,
      name: 'Notebook Dell Inspiron 15',
      description:
        'Notebook Dell Inspiron 15 com processador Intel i5, 8GB de RAM e SSD de 256GB.',
      value: 4200,
      stock: 10,
    },
    {
      id: 3,
      name: 'Fone de Ouvido Bluetooth',
      description:
        'Fone de ouvido Bluetooth com cancelamento de ruído e bateria de até 20 horas.',
      value: 250,
      stock: 30,
    },
    {
      id: 4,
      name: 'Smart TV 50" 4K',
      description:
        'Smart TV LG 50 polegadas com resolução 4K e integração com Alexa e Google Assistant.',
      value: 2800,
      stock: 8,
    },
    {
      id: 5,
      name: 'Mochila para Notebook',
      description:
        'Mochila resistente com compartimento acolchoado para notebook de até 15 polegadas.',
      value: 120,
      stock: 25,
    },
    {
      id: 6,
      name: 'Câmera DSLR Canon EOS',
      description:
        'Câmera DSLR Canon EOS Rebel T7 com lente 18-55mm, ideal para fotógrafos iniciantes.',
      value: 2200,
      stock: 12,
    },
    {
      id: 7,
      name: 'Tablet Samsung Galaxy Tab A7',
      description:
        'Tablet Samsung Galaxy Tab A7 com tela de 10.4 polegadas e 64GB de armazenamento.',
      value: 1500,
      stock: 18,
    },
    {
      id: 8,
      name: 'Relógio Inteligente Xiaomi Mi Band 6',
      description:
        'Relógio inteligente com monitoramento de batimentos cardíacos e oxigenação no sangue.',
      value: 300,
      stock: 22,
    },
    {
      id: 9,
      name: 'Impressora Multifuncional HP',
      description:
        'Impressora HP multifuncional com scanner e Wi-Fi integrado.',
      value: 800,
      stock: 14,
    },
    {
      id: 10,
      name: 'Teclado Mecânico RGB',
      description:
        'Teclado mecânico com iluminação RGB e switches azuis para gamers.',
      value: 350,
      stock: 20,
    },
    {
      id: 11,
      name: 'Mouse Gamer Sem Fio',
      description:
        'Mouse gamer sem fio com 6 botões programáveis e sensor de alta precisão.',
      value: 200,
      stock: 30,
    },
    {
      id: 12,
      name: 'Cadeira Gamer Ergonômica',
      description: 'Cadeira gamer com ajuste de altura e apoio lombar.',
      value: 1200,
      stock: 7,
    },
    {
      id: 13,
      name: 'Ventilador de Mesa',
      description:
        'Ventilador de mesa com 3 velocidades e oscilação automática.',
      value: 90,
      stock: 40,
    },
    {
      id: 14,
      name: 'Liquidificador Philips',
      description:
        'Liquidificador Philips com 6 velocidades e jarra de 2 litros.',
      value: 180,
      stock: 15,
    },
    {
      id: 15,
      name: 'Air Fryer Mondial',
      description:
        'Air Fryer Mondial com capacidade de 4,5 litros e timer ajustável.',
      value: 400,
      stock: 10,
    },
    {
      id: 16,
      name: 'Panela de Pressão Elétrica',
      description:
        'Panela de pressão elétrica com 6 litros de capacidade e 10 programas pré-definidos.',
      value: 350,
      stock: 12,
    },
    {
      id: 17,
      name: 'Jogo de Panelas Antiaderentes',
      description:
        'Jogo de panelas antiaderentes com 5 peças e cabo revestido.',
      value: 280,
      stock: 18,
    },
    {
      id: 18,
      name: 'Tênis Nike Air Max',
      description:
        'Tênis Nike Air Max com amortecimento de ar e design moderno.',
      value: 600,
      stock: 20,
    },
    {
      id: 19,
      name: 'Camiseta Polo Masculina',
      description: 'Camiseta polo masculina em algodão com acabamento premium.',
      value: 120,
      stock: 50,
    },
    {
      id: 20,
      name: 'Bolsa Feminina de Couro',
      description: 'Bolsa feminina de couro sintético com alça ajustável.',
      value: 150,
      stock: 25,
    },
    {
      id: 21,
      name: 'Óculos de Sol Ray-Ban',
      description:
        'Óculos de sol Ray-Ban com lentes polarizadas e armação em acetato.',
      value: 500,
      stock: 10,
    },
    {
      id: 22,
      name: 'Perfume Masculino Calvin Klein',
      description:
        'Perfume masculino Calvin Klein Eternity, fragrância amadeirada e fresca.',
      value: 300,
      stock: 15,
    },
    {
      id: 23,
      name: 'Perfume Feminino Chanel',
      description:
        'Perfume feminino Chanel N°5, fragrância icônica e sofisticada.',
      value: 450,
      stock: 12,
    },
    {
      id: 24,
      name: 'Máquina de Café Nespresso',
      description:
        'Máquina de café Nespresso com cápsulas inclusas e design compacto.',
      value: 700,
      stock: 9,
    },
    {
      id: 25,
      name: 'Aspirador de Pó Robô',
      description:
        'Aspirador de pó robô com mapeamento inteligente e controle via app.',
      value: 1200,
      stock: 6,
    },
    {
      id: 26,
      name: 'Bicicleta Ergométrica',
      description:
        'Bicicleta ergométrica com 8 níveis de resistência e monitor de frequência cardíaca.',
      value: 1500,
      stock: 5,
    },
  ]

  return (
    <>
      <main className="h-full w-full">
        <div>
          <h1 className="mb-2 text-4xl">Produtos</h1>
          <Divider />
        </div>

        <ProductList data={mockData} />
      </main>
    </>
  )
}

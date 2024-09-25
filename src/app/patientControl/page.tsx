import { Divider } from '@mui/material'
import { PatientsTable } from './components/PatientsTable'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Controle dos Pacientes',
}

const DATA_MOCK = [
  {
    id: '41231',
    name: 'Ruan Cardoso',
    email: 'ruancardoso@gmail.com',
    phone: '7198123559',
    image: 'string',
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z',
    total_score: 234,
    is_verified: true,
  },
  {
    id: '5234432',
    name: 'Matheus Brito',
    email: 'brito@gmail.com',
    phone: '7198123559',
    image: 'string',
    createdAt: '2021-02-01T00:00:00.000Z',
    updatedAt: '2021-02-01T00:00:00.000Z',
    total_score: 921,
    is_verified: true,
  },
  {
    id: '23452',
    name: 'Eduardo Tavares',
    email: 'tavares@gmail.com',
    phone: '7198844556',
    image: 'string',
    createdAt: '2021-02-01T00:00:00.000Z',
    updatedAt: '2021-02-01T00:00:00.000Z',
    total_score: 573,
    is_verified: true,
  },
  {
    id: '14523',
    name: 'Clara Mendes',
    email: 'clara.mendes@gmail.com',
    phone: '71981112233',
    image: 'string',
    createdAt: '2021-03-05T00:00:00.000Z',
    updatedAt: '2021-03-05T00:00:00.000Z',
    total_score: 345,
    is_verified: false,
  },
  {
    id: '91234',
    name: 'Felipe Silva',
    email: 'felipe.silva@gmail.com',
    phone: '71982223344',
    image: 'string',
    createdAt: '2021-04-01T00:00:00.000Z',
    updatedAt: '2021-04-01T00:00:00.000Z',
    total_score: 678,
    is_verified: true,
  },
  {
    id: '23523',
    name: 'Mariana Lima',
    email: 'mariana.lima@gmail.com',
    phone: '71983334455',
    image: 'string',
    createdAt: '2021-05-11T00:00:00.000Z',
    updatedAt: '2021-05-11T00:00:00.000Z',
    total_score: 412,
    is_verified: true,
  },
  {
    id: '98234',
    name: 'Lucas Ferreira',
    email: 'lucas.ferreira@gmail.com',
    phone: '71984445566',
    image: 'string',
    createdAt: '2021-06-21T00:00:00.000Z',
    updatedAt: '2021-06-21T00:00:00.000Z',
    total_score: 290,
    is_verified: false,
  },
  {
    id: '67456',
    name: 'Julia Costa',
    email: 'julia.costa@gmail.com',
    phone: '71985556677',
    image: 'string',
    createdAt: '2021-07-30T00:00:00.000Z',
    updatedAt: '2021-07-30T00:00:00.000Z',
    total_score: 821,
    is_verified: true,
  },
  {
    id: '72345',
    name: 'Pedro Almeida',
    email: 'pedro.almeida@gmail.com',
    phone: '71986667788',
    image: 'string',
    createdAt: '2021-08-15T00:00:00.000Z',
    updatedAt: '2021-08-15T00:00:00.000Z',
    total_score: 503,
    is_verified: true,
  },
  {
    id: '34512',
    name: 'Renata Souza',
    email: 'renata.souza@gmail.com',
    phone: '71987778899',
    image: 'string',
    createdAt: '2021-09-10T00:00:00.000Z',
    updatedAt: '2021-09-10T00:00:00.000Z',
    total_score: 694,
    is_verified: false,
  },
  {
    id: '41231',
    name: 'Neymar Junio',
    email: 'neymar@gmail.com',
    phone: '7198153159',
    image: 'string',
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z',
    total_score: 1234,
    is_verified: true,
  },
  {
    id: '5234432',
    name: 'Travis Scott',
    email: 'stormi@gmail.com',
    phone: '71985235459',
    image: 'string',
    createdAt: '2021-02-01T00:00:00.000Z',
    updatedAt: '2021-02-01T00:00:00.000Z',
    total_score: 3125,
    is_verified: false,
  },
  {
    id: '23452',
    name: '21 Savage',
    email: 'selvagem@gmail.com',
    phone: '71981844526',
    image: 'string',
    createdAt: '2021-02-01T00:00:00.000Z',
    updatedAt: '2021-02-01T00:00:00.000Z',
    total_score: 1573,
    is_verified: true,
  },
  {
    id: '14523',
    name: 'Matuê',
    email: 'tue085@gmail.com',
    phone: '85981218933',
    image: 'string',
    createdAt: '2021-03-05T00:00:00.000Z',
    updatedAt: '2021-03-05T00:00:00.000Z',
    total_score: 35,
    is_verified: false,
  },
  {
    id: '91234',
    name: 'Donald Trump',
    email: 'kamala@gmail.com',
    phone: '7198249344',
    image: 'string',
    createdAt: '2021-04-01T00:00:00.000Z',
    updatedAt: '2021-04-01T00:00:00.000Z',
    total_score: 678,
    is_verified: true,
  },
  {
    id: '23523',
    name: 'Mariana Lima',
    email: 'mariana.lima@gmail.com',
    phone: '71983334455',
    image: 'string',
    createdAt: '2021-05-11T00:00:00.000Z',
    updatedAt: '2021-05-11T00:00:00.000Z',
    total_score: 412,
    is_verified: true,
  },
  {
    id: '98234',
    name: 'Lucas Ferreira',
    email: 'lucas.ferreira@gmail.com',
    phone: '71984445566',
    image: 'string',
    createdAt: '2021-06-21T00:00:00.000Z',
    updatedAt: '2021-06-21T00:00:00.000Z',
    total_score: 290,
    is_verified: false,
  },
  {
    id: '67456',
    name: 'Bob Marley',
    email: 'weed@gmail.com',
    phone: '71985556677',
    image: 'string',
    createdAt: '2021-07-30T00:00:00.000Z',
    updatedAt: '2021-07-30T00:00:00.000Z',
    total_score: 185,
    is_verified: true,
  },
  {
    id: '72345',
    name: 'Coro de rato',
    email: 'leatherofmouse@gmail.com',
    phone: '71986667788',
    image: 'string',
    createdAt: '2021-08-15T00:00:00.000Z',
    updatedAt: '2021-08-15T00:00:00.000Z',
    total_score: 503,
    is_verified: true,
  },
  {
    id: '34512',
    name: 'Michael Jackson',
    email: 'billieJean@gmail.com',
    phone: '71987153899',
    image: 'string',
    createdAt: '2021-09-10T00:00:00.000Z',
    updatedAt: '2021-09-10T00:00:00.000Z',
    total_score: 694,
    is_verified: false,
  },
]

// async function getUsersList() {
//   try {
//     const response = await fetch(
//       'https://sistema-de-pontos-back.onrender.com/users',
//     )

//     if (response.ok) {
//       const data = await response.json()
//       return data
//     }
//   } catch (error) {
//     console.log('Ops, ocorreu um erro', error)
//   }
// }

export default async function PatientControl() {
  // const data = await getUsersList()

  return (
    <>
      <div>
        <h1 className="mb-2 text-4xl">Controle dos Pacientes</h1>
        <Divider />
      </div>

      <PatientsTable data={DATA_MOCK} />
    </>
  )
}

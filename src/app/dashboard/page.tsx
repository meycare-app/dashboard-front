'use client'

import { FilterAlt, FilterAltOff } from '@mui/icons-material'
import {
  Button,
  createTheme,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
} from '@mui/material'
import { useState } from 'react'
import Card from './components/Card'

const theme = createTheme({
  palette: {
    primary: {
      main: '#E3A631',
    },
  },
})

export default function Dashboard() {
  const [period, setPeriod] = useState('')

  function handleSelectChange(ev: SelectChangeEvent) {
    setPeriod(ev.target.value)
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1 className="mb-2 text-4xl">Dashboard</h1>
        <Divider />

        <div className="mt-8">
          <header>
            <div className="flex justify-between">
              <span className="flex items-center gap-1 md:gap-4">
                <FormControl className="w-56" size="small">
                  <InputLabel id="period">Período</InputLabel>
                  <Select
                    labelId="period"
                    id="period-select"
                    label="Período"
                    value={period}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="">
                      <em>Limpar</em>
                    </MenuItem>
                    <MenuItem value={1}>12/09/2023 - 12/04/2024</MenuItem>
                    <MenuItem value={2}>12/09/2023 - 12/04/2024</MenuItem>
                    <MenuItem value={3}>12/09/2023 - 12/04/2024</MenuItem>
                  </Select>
                </FormControl>

                {period !== '' ? (
                  <IconButton type="button">
                    <FilterAlt className="h-6 w-6 cursor-pointer text-black/55 transition-colors duration-100 hover:text-black/75" />
                  </IconButton>
                ) : (
                  <IconButton disabled>
                    <FilterAltOff className="h-6 w-6 text-black/55" />
                  </IconButton>
                )}
              </span>

              <Button
                variant="contained"
                color="primary"
                className="font-semibold"
              >
                Filtrar
              </Button>
            </div>
          </header>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:gap-48">
            <div className="mx-auto w-fit">
              <h2 className="mb-4 text-center">Usuários</h2>

              <div className="flex flex-col gap-4">
                <Card />
                <Card />
                <Card />
              </div>
            </div>
            <div className="mx-auto w-fit">
              <h2 className="mb-4 text-center">Pontos</h2>

              <div className="flex flex-col gap-4">
                <Card />
                <Card />
                <Card />
              </div>
            </div>
            <div className="mx-auto w-fit">
              <h2 className="mb-4 text-center">Vendas</h2>

              <div className="flex flex-col gap-4">
                <Card />
                <Card />
                <Card />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

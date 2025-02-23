'use client'

import { Button, FormControl, TextField } from '@mui/material'
import { signOut } from 'next-auth/react'

interface ProfileFormProps {
  id: string
  name: string
  email: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export function ProfileForm({
  name,
  email,
  deleted_at: deletedAt,
}: ProfileFormProps) {
  return (
    <div className="mt-16">
      <div className="space-y-8">
        <FormControl className="grid w-[90%] grid-cols-10 gap-4">
          <TextField
            className="col-span-5"
            variant="outlined"
            label="Nome do colaborador"
            value={name}
            sx={{
              '& .MuiOutlinedInput-root.Mui-disabled': {
                '& fieldset': {
                  borderColor: '#00000061',
                },
              },
            }}
            disabled
          />
          <TextField
            className="col-span-5"
            variant="outlined"
            label="E-mail"
            value={email}
            sx={{
              '& .MuiOutlinedInput-root.Mui-disabled': {
                '& fieldset': {
                  borderColor: '#00000061',
                },
              },
            }}
            disabled
          />

          <TextField
            className="col-span-2"
            variant="outlined"
            label="Status"
            value={deletedAt ? 'Inativo' : 'Ativo'}
            sx={{
              '& .MuiOutlinedInput-root.Mui-disabled': {
                '& fieldset': {
                  borderColor: '#00000061',
                },
              },
            }}
            disabled
          />
        </FormControl>

        <div className="grid w-[90%] grid-cols-10 gap-4">
          <Button
            className="col-span-2"
            variant="contained"
            color="error"
            size="large"
            onClick={() => {
              signOut()
            }}
          >
            Sair
          </Button>
        </div>
      </div>
    </div>
  )
}

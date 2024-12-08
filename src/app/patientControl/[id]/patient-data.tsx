import { phoneMask } from '@/utils/masks/phoneMask'
import { FormControl, TextField } from '@mui/material'
import { PatientDataProps } from './type'

export function PatientData({ data }: PatientDataProps) {
  const { phone, email, points, indicated_by_name: indicatedBy } = data

  return (
    <FormControl className="mb-8 mt-12 grid w-4/5 grid-cols-8 gap-4">
      <TextField
        variant="outlined"
        label="Celular"
        className="col-span-4"
        value={phoneMask(phone)}
        disabled
        sx={{
          '& .MuiOutlinedInput-root.Mui-disabled': {
            '& fieldset': {
              borderColor: '#00000061',
            },
          },
        }}
      />
      <TextField
        variant="outlined"
        label="E-mail"
        className="col-span-4"
        value={email}
        disabled
        sx={{
          '& .MuiOutlinedInput-root.Mui-disabled': {
            '& fieldset': {
              borderColor: '#00000061',
            },
          },
        }}
      />
      <TextField
        variant="outlined"
        label="Pontos"
        className="col-span-4"
        value={points}
        disabled
        sx={{
          '& .MuiOutlinedInput-root.Mui-disabled': {
            '& fieldset': {
              borderColor: '#00000061',
            },
          },
        }}
      />
      <TextField
        variant="outlined"
        label="Quem indicou"
        placeholder="Nome do paciente"
        className="col-span-8"
        value={indicatedBy || 'Não informado'}
        disabled
        sx={{
          '& .MuiOutlinedInput-root.Mui-disabled': {
            '& fieldset': {
              borderColor: '#00000061',
            },
          },
        }}
      />
    </FormControl>
  )
}

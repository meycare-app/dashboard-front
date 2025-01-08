'use client'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  MenuItem,
  Card,
  Select,
  InputLabel,
} from '@mui/material'
import { PatientDataProps } from './type'
import dayjs from 'dayjs'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import { Refresh, Search } from '@mui/icons-material'
import { useServerAction } from 'zsa-react'
import { deleteActivityAction } from './action'

export function PatientHistory({ data, activitiesType }: PatientDataProps) {
  const { name, activities, id } = data

  const [openCreateAction, setOpenCreateAction] = useState(false)
  const [openRemoveActionDialog, setOpenRemoveActionDialog] = useState(false)
  const [activityId, setActivityId] = useState('')

  const { execute, isPending } = useServerAction(deleteActivityAction)

  const handleDeleteActivity = async (id: string, activityId: string) => {
    await execute({ id, activityId })
    setActivityId('')
    setOpenRemoveActionDialog(false)
  }

  const handleCreateActionDialogOpen = () => {
    setOpenCreateAction(true)
  }

  const handleCreateActionDialogClose = () => {
    setOpenCreateAction(false)
  }

  const handleRemoveActionDialogOpen = (activityId: string) => {
    setActivityId(activityId)
    setOpenRemoveActionDialog(true)
  }

  const handleRemoveActionDialogClose = () => {
    setOpenRemoveActionDialog(false)
  }

  return (
    <div>
      {activities.length > 0 &&
        activities.map((activity) => (
          <div key={activity.id} className="w-full">
            <div className="mb-1 mt-6 flex items-center justify-between px-4">
              <div className="flex flex-col gap-4">
                <h2>{activity.activity_data.product_name}</h2>

                <div className="flex flex-col gap-1 text-[#49454F]">
                  <p>Data: {dayjs(activity.created_at).format('DD/MM/YYYY')}</p>
                  <p>Administrador: {name}</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <p>{activity.points} pontos</p>

                <Button
                  onClick={() => handleRemoveActionDialogOpen(activity.id)}
                >
                  <DeleteIcon className="size-8 text-red-500" />
                </Button>
              </div>
            </div>

            <Divider />
          </div>
        ))}

      {activities.length <= 0 && (
        <div className="flex h-80 items-center justify-center">
          <Card className="flex flex-col items-center gap-2 p-20">
            <span>
              <Search className="text-4xl text-[#E3A631]" />
            </span>

            <p className="text-center text-lg text-[#E3A631]">
              Nenhuma ação registrada
            </p>
          </Card>
        </div>
      )}

      <div className="mb-32 mt-8">
        <Button
          variant="contained"
          className="px-12"
          color="primary"
          onClick={handleCreateActionDialogOpen}
        >
          ADICIONAR AÇÃO
        </Button>
      </div>

      <Dialog
        open={openCreateAction}
        onClose={handleCreateActionDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Adicionar ação</DialogTitle>

        <DialogContent className="h-80">
          <form action="">
            <FormControl fullWidth className="mt-2">
              <InputLabel id="action">Ação</InputLabel>
              <Select
                label="Ação"
                name="action"
                type="text"
                placeholder="Ação"
                variant="outlined"
              >
                {activitiesType &&
                  activitiesType.map((activity) => (
                    <MenuItem key={activity.id} value={activity.id}>
                      {activity.name}: {activity.points} pontos
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>

        <DialogActions>
          <Button
            color="error"
            variant="outlined"
            onClick={handleCreateActionDialogClose}
            className="px-6"
          >
            Cancelar
          </Button>

          <Button className="px-8" color="primary" variant="contained">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openRemoveActionDialog}
        onClose={handleRemoveActionDialogClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          Você tem certeza que deseja excluir a ação desse usuário ?
        </DialogTitle>

        <DialogContent>
          <p>Essa exclusão não pode ser revertida.</p>
        </DialogContent>

        <DialogActions>
          <Button
            color="error"
            variant="outlined"
            onClick={handleRemoveActionDialogClose}
            className="px-6"
          >
            Cancelar
          </Button>

          <Button
            className="w-32 px-8"
            color="error"
            variant="contained"
            onClick={() => handleDeleteActivity(id, activityId)}
            disabled={isPending}
          >
            {isPending ? (
              <p>
                <Refresh className="animate-spin" />
              </p>
            ) : (
              'Excluir'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

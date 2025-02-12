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
import { addActivityTypeAction, deleteActivityAction } from './action'

export function PatientHistory({ data, activitiesType }: PatientDataProps) {
  const { activities, id } = data

  const [openCreateAction, setOpenCreateAction] = useState(false)
  const [openRemoveActionDialog, setOpenRemoveActionDialog] = useState(false)
  const [activityId, setActivityId] = useState('')

  const { execute, isPending } = useServerAction(deleteActivityAction)
  const {
    executeFormAction,
    isPending: isAddActivityTypePending,
    error: addActivityTypeError,
    reset: resetAddActivityType,
  } = useServerAction(addActivityTypeAction, {
    bind: {
      userId: id,
    },
  })

  const handleDeleteActivity = async (id: string, activityId: string) => {
    await execute({ id, activityId })
    setActivityId('')
    setOpenRemoveActionDialog(false)
  }

  const handleCreateActionDialogOpen = () => {
    setOpenCreateAction(true)
  }

  const handleCreateActionDialogClose = () => {
    resetAddActivityType()

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
                {activity.activity_data.product_name && (
                  <h2>{activity.activity_data.product_name}</h2>
                )}

                <div className="flex flex-col gap-4 text-[#49454F]">
                  <p>Data: {dayjs(activity.created_at).format('DD/MM/YYYY')}</p>
                  {activity.activity_data.admin_name && (
                    <p>Administrador: {activity.activity_data.admin_name}</p>
                  )}
                </div>
              </div>

              <div className="flex w-28 flex-col items-center gap-4">
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

        <form action={executeFormAction}>
          <DialogContent className="h-80">
            <FormControl fullWidth className="mt-2">
              <InputLabel id="activityTypeId">Ação</InputLabel>
              <Select
                label="Ação"
                name="activityTypeId"
                type="text"
                placeholder="Ação"
                variant="outlined"
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 225,
                    },
                  },
                }}
              >
                {activitiesType &&
                  activitiesType?.length > 0 &&
                  activitiesType.map((activity) => (
                    <MenuItem key={activity.id} value={activity.id}>
                      {activity.name}: {activity.points} pontos
                    </MenuItem>
                  ))}

                {activitiesType && activitiesType?.length <= 0 && (
                  <MenuItem disabled>Nenhuma ação cadastrada</MenuItem>
                )}
              </Select>
              {addActivityTypeError?.fieldErrors?.activityTypeId && (
                <p className="mt-2 text-center text-sm italic text-red-500">
                  {addActivityTypeError?.fieldErrors?.activityTypeId}
                </p>
              )}
            </FormControl>
          </DialogContent>

          <DialogActions>
            <Button
              color="error"
              type="button"
              variant="outlined"
              onClick={handleCreateActionDialogClose}
              className="px-6"
            >
              Cancelar
            </Button>

            <Button
              className="w-32 px-8"
              variant="contained"
              type="submit"
              disabled={isAddActivityTypePending}
            >
              {isAddActivityTypePending ? (
                <p>
                  <Refresh className="animate-spin" />
                </p>
              ) : (
                'Adicionar'
              )}
            </Button>
          </DialogActions>
        </form>
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
          <p>Essa ação não pode ser revertida.</p>
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

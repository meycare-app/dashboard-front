import { Divider } from '@mui/material'
import { PatientData } from './patient-data'
import { getCommonUserInfo } from '@/http/admin/get-common-user-info'
import { PatientHistory } from './patient-history'
import { Metadata } from 'next'
import { getActivitiesType } from '@/http/activities/get-activities-type'

export const metadata: Metadata = {
  title: 'Detalhes do Paciente',
}

export default async function Page({ params }: { params: { id: string } }) {
  const commonUserInfo = await getCommonUserInfo({ id: params.id })
  const activitiesType = await getActivitiesType({
    url: '/activities/activity-type/0/99',
  }).then((res) =>
    res.results.filter(
      (activity) =>
        activity.name !== 'Indicação' && activity.name !== 'Compra de produto',
    ),
  )

  return (
    <>
      <main className="mx-auto mt-8 w-4/5">
        <div>
          <h1 className="mb-2 text-4xl">{commonUserInfo.name}</h1>

          <Divider />

          <PatientData data={commonUserInfo} />
        </div>

        <div>
          <h1 className="mb-2 text-4xl">Histórico do paciente</h1>

          <Divider />

          <PatientHistory
            data={commonUserInfo}
            activitiesType={activitiesType}
          />
        </div>
      </main>
    </>
  )
}

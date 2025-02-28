import { Navbar } from '@/components/menu/Navbar'

export default function PatientControlLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Navbar />

      {children}
    </div>
  )
}

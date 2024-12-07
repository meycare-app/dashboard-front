import Appbar from '@/components/menu/Navbar'

export default function PatientControlLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Appbar />

      {children}
    </div>
  )
}

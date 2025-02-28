export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/patientControl/:path*',
    '/adminControl/:path*',
    '/register/:path*',
    '/historico-de-vendas/:path*',
    '/profile/:path*',
    '/score/:path*',
  ],
}

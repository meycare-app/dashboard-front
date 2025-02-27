import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

interface UserResponse {
  token: string
  tokenExpiresIn: string
  refreshToken: string
  refreshTokenExpiresIn: string
  adminWithoutPassword: {
    id: string
  }
}

async function refreshAccessToken(token: {
  email: string
  token: string
  tokenExpires: number
  refreshToken: string
  refreshTokenExpires: number
}) {
  try {
    console.log(
      'Refreshing access token with refreshToken:',
      token.refreshToken,
    )

    const response = await fetch(`${process.env.API_URL}/admin/token/refresh`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.refreshToken}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Response error text:', errorText)
      throw new Error(
        `Failed to refresh access token. Status: ${response.status}`,
      )
    }

    const refreshedTokens = await response.json()

    console.log('Refreshed tokens received:', refreshedTokens)

    return {
      ...token,
      token: refreshedTokens.token,
      refreshToken: refreshedTokens.refreshToken,
      tokenExpires: new Date(refreshedTokens.tokenExpiresIn).getTime(),
      refreshTokenExpires: new Date(
        refreshedTokens.refreshTokenExpiresIn,
      ).getTime(),
      email: token.email,
    }
  } catch (error) {
    console.error('Refresh token error:', error)
    return {
      ...token,
      token: token.token,
      refreshToken: token.refreshToken,
      tokenExpires: token.tokenExpires,
      refreshTokenExpires: token.refreshTokenExpires,
      email: token.email,
      error: 'RefreshAccessTokenError',
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password')
        }

        const response = await fetch(`${process.env.API_URL}/admin/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })

        if (!response.ok) {
          throw new Error('Invalid credentials')
        }

        const user: UserResponse = await response.json()

        if (user && user.token) {
          return {
            id: user.adminWithoutPassword.id,
            token: user.token,
            tokenExpires: new Date(user.tokenExpiresIn).getTime(),
            refreshToken: user.refreshToken,
            refreshTokenExpires: new Date(user.refreshTokenExpiresIn).getTime(),
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log('User signed in:', user)
        return {
          ...token,
          token: user.token,
          tokenExpires: user.tokenExpires,
          refreshToken: user.refreshToken,
          refreshTokenExpires: user.refreshTokenExpires,
        }
      }

      if (Date.now() < (token.tokenExpires as number)) {
        return token
      }

      return refreshAccessToken({
        token: token.token as string,
        tokenExpires: token.tokenExpires as number,
        refreshToken: token.refreshToken as string,
        refreshTokenExpires: token.refreshTokenExpires as number,
        email: token.email as string,
      })
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          email: token.email,
          token: token.token as string,
        }
        session.tokenExpires = token.tokenExpires as number
        session.refreshToken = token.refreshToken as string
        session.refreshTokenExpires = token.refreshTokenExpires as number
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

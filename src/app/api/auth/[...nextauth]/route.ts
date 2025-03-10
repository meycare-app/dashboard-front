import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface UserResponse {
  token: string;
  tokenExpiresIn: string;
  refreshToken: string;
  refreshTokenExpiresIn: string;
  adminWithoutPassword: {
    id: string;
    role: string;
  }
}

async function refreshAccessToken(token: any) {
  try {
    console.log("Refreshing access token with refreshToken:", token.refreshToken); // Log para debug

    const response = await fetch(`${process.env.API_URL}/admin/token/refresh`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.refreshToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text(); // Log da resposta caso tenha erro
      console.error("Response error text:", errorText);
      throw new Error(`Failed to refresh access token. Status: ${response.status}`);
    }

    const refreshedTokens = await response.json();

    console.log("Refreshed tokens received:", refreshedTokens); // Log da resposta bem-sucedida

    return {
      ...token,
      token: refreshedTokens.token,
      refreshToken: refreshedTokens.refreshToken,
      tokenExpires: new Date(refreshedTokens.tokenExpiresIn).getTime(),
      refreshTokenExpires: new Date(refreshedTokens.refreshTokenExpiresIn).getTime(),
    };
  } catch (error) {
    console.error("Refresh token error:", error); // Log detalhado do erro
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const response = await fetch(`${process.env.API_URL}/admin/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!response.ok) {
          throw new Error("Invalid credentials");
        }

        const user: UserResponse = await response.json();

        if (user && user.token) {
          return {
            id: user.adminWithoutPassword.id,
            role: user.adminWithoutPassword.role,
            token: user.token,
            tokenExpires: new Date(user.tokenExpiresIn).getTime(),
            refreshToken: user.refreshToken,
            refreshTokenExpires: new Date(user.refreshTokenExpiresIn).getTime(),
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        console.log("User signed in:", user); // Log para debug
        return {
          ...token,
          token: user.token,
          tokenExpires: user.tokenExpires,
          refreshToken: user.refreshToken,
          refreshTokenExpires: user.refreshTokenExpires,
          role: user.role,
        };
      }

      // Token is still valid
      if (Date.now() < (token.tokenExpires as number)) {
        return token;
      }

      // Access token expired, try to refresh it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          email: token.email,
          token: token.token as string,
          role: token.role as string,
        };
        session.tokenExpires = token.tokenExpires as number;
        session.refreshToken = token.refreshToken as string;
        session.refreshTokenExpires = token.refreshTokenExpires as number;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

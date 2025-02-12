import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      token: string;
    },
    tokenExpires: number;
    refreshToken: string;
    refreshTokenExpires: number;
  }

  interface User {
    token: string;
    tokenExpires: number;
    refreshToken: string;
    refreshTokenExpires: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email: string;
    token: string;
  }
}

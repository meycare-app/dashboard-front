import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      token: string;
    };
  }

  interface User {
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email: string;
    token: string;
  }
}

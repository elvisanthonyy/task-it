import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string;
    idToken?: string;
  }

  interface User {
    id?: string;
  }

  interface Session {
    accessToken?: string;
    idToken?: string;
  }
}

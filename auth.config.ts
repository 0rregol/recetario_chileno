import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnCreate = nextUrl.pathname.startsWith('/recipes/create');
      if (isOnCreate) {
        if (isLoggedIn) return true;
        return false; // Redirige a login si intenta crear sin sesión
      }
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;
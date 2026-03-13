import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { users } from "@/lib/mockData";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const identifier = credentials.username as string;
        const password = credentials.password as string;

        const user = users.find((u) => u.username === identifier);

        if (!user) {
          return null;
        }

        // Simple plain text check for mock data (admin/admin123, mahasiswa1/pass123)
        if (user.password !== password) {
          return null;
        }

        // Campus domain check
        if (user.email && !user.email.endsWith("@uniku.ac.id")) {
          return null;
        }

        return {
          id: user.id.toString(),
          name: user.nama,
          email: user.email || user.username,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});

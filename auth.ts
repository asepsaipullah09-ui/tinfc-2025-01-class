import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

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

        const identifier = credentials.username as string; // username or email
        const password = credentials.password as string;

        try {
        const [result] = await pool.execute(
            "SELECT * FROM users WHERE username = ?",
            [identifier]
          );

          const user = Array.isArray(result) ? result[0] : null;

          if (!user) {
            return null;
          }

          // Campus domain check if email exists
          if (user.email && !user.email.endsWith('@uniku.ac.id')) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(password, (user as any).password);

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: (user as any).id.toString(),
            name: (user as any).nama,
            email: (user as any).email || (user as any).username,
            role: (user as any).role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
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
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getAccountByUserId, getUserById } from "@/queries/get-user";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  pages: {
    error: "/auth/error",
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
      }

      return session;
    },
    async jwt({ token, user }) {
      // This callback runs after the user has been inserted into the database
      if (user) {
        const dashboardApiUrl =
          "http://localhost:3000/api/public/users/create-user";

        try {
          const response = await fetch(dashboardApiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
              role: "USER",
            }),
          });

          if (response.ok) {
            console.log("User data sent to the external system successfully.");
          } else {
            console.error("Failed to send user data to the external system.");
          }
        } catch (error) {
          console.error("Error sending user data:", error);
        }

        token.sub = user.id; // Ensure the token's subject is the user's ID
      }

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});

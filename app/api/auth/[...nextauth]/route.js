import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs/promises";
const fakeDBPath = path.join(process.cwd(), "fakeDB", "db.json");

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "signIn",
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const fileContent = await fs.readFile(fakeDBPath, "utf-8");
          const data = JSON.parse(fileContent);

          const user = data.users.find((user) => user.email === email);

          if (!user) {
            console.log("User not found.");
            return null;
          }

          const passwordMatches = await bcrypt.compare(password, user.password);

          if (!passwordMatches) {
            return null;
          }

          return {
            id: user.email,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
          };
        } catch (error) {
          console.error("Error reading the database file:", error);
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          const dbContent = await fs.readFile(fakeDBPath, "utf-8");
          const data = dbContent ? JSON.parse(dbContent) : { users: [] };

          const existingUser = data.users.find((u) => u.email === user.email);
          if (!existingUser) {
            const newUser = {
              username: user.name,
              email: user.email,
              image: user.image,
              provider: "google",
            };
            data.users.push(newUser);

            await fs.writeFile(
              fakeDBPath,
              JSON.stringify(data, null, 2),
              "utf-8"
            );
          }
        } catch (error) {
          console.error("Error handling Google sign-in:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.image = user.image;
      }
      token.expires = Math.floor(Date.now() / 1000) + 1 * 24 * 60 * 60;
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.image = token.image;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

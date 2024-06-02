import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { loginWithGoogle, signIn } from "@/services/auth/services";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";
import jwt from "jsonwebtoken";

const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await signIn(email);
        if (user) {
          const passwordMatch = await compare(password, user.password);
          if (passwordMatch) {
            return user;
          } else {
            throw new Error("Password incorrect");
          }
        } else {
          throw new Error("Email incorrect");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.name = user.name;
        token.id = user.id;
        token.image = user.image;
      }
      if (account?.provider === "google") {
        const data = {
          name: user.name,
          email: user.email,
          type: "google",
          image: user.image,
        };

        await loginWithGoogle(data, (data: any) => {
          token.email = data.email;
          token.name = data.name;
          token.id = data.id;
          token.image = data.image;
          token.type = data.type;
        });
      }
      return token;
    },

    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }

      if ("name" in token) {
        session.user.name = token.name;
      }

      if ("image" in token) {
        session.user.image = token.image;
      }

      if ("id" in token) {
        session.user.id = token.id;
      }
      if ("type" in token) {
        session.user.type = token.type;
      }

      const accessToken = jwt.sign(token, process.env.NEXTAUTH_SECRET || "", {
        algorithm: "HS256",
      });

      session.accessToken = accessToken;

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOption);

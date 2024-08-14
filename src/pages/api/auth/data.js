// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // Provayder nomi (Login formida ko'rinadi)
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const response = await fetch(
          "https://worldspeechai.com/api/v1/auth/jwt/create/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const user = await response.json();

        if (user && user.access) {
          return { email: credentials.email, accessToken: user.access };
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    },
    async signIn(user, account, profile) {
      console.log("email=", user.email);
      const response = await fetch(
        "https://worldspeechai.com/api/v1/auth/jwt/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "husan@example.com",
            password: "12345678Hp",
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.refresh && data.access) {
        return true;
      } else {
        return "/auth/register";
      }
    },
  },
});

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

        if (user && user.access && user.refresh) {
          return {
            email: credentials.email,
            accessToken: user.access,
            refreshToken: user.refresh,
          };
        } else {
          throw new Error(user.detail);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      if (account?.provider === "google" && account?.access_token) {
        const response = await fetch(
          // "https://worldspeechai.com/api/v1/auth/o/google-oauth2/?redirect_uri=https://worldspeechai.com/api/v1/auth/o/google-oauth2/",
          "https://worldspeechai.com/api/v1/auth/jwt/create/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: "admin@mail.ru",
              password: "52340091Hh", // This should be changed to a more secure approach
            }),
          }
        );

        const data = await response.json();

        if (data.access && data.refresh) {
          token.accessToken = data.access;
          token.refreshToken = data.refresh;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
    async signIn({ user, account }) {
      console.log("ishladi", user);
      if (account.provider === "google") {
        const response = await fetch(
          "https://worldspeechai.com/api/v1/auth/jwt/create/",
          // "https://worldspeechai.com/api/v1/auth/o/google-oauth2/?redirect_uri=https://worldspeechai.com/api/v1/auth/o/google-oauth2/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: "admin@mail.ru",
              password: "52340091Hh", // This should be changed to a more secure approach
            }),
          }
        );

        const data = await response.json();

        console.log(data);
        if (data.access && data.refresh) {
          user.accessToken = data.access;
          user.refreshToken = data.refresh;
          return true;
        } else {
          return "/auth/register";
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Customize the redirect URL after successful sign in
      if (url === baseUrl || url === baseUrl + "/") {
        return baseUrl + "/dashboard";
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});

// ================================================================

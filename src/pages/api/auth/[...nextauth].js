// // pages/api/auth/[...nextauth].js

// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user }, account, profile) {
//       // Foydalanuvchini backend API orqali tekshirish
//       console.log(user.email);
//       const response = await fetch(
//         "https://worldspeechai.com/api/v1/auth/jwt/create/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: "husan@example.com",
//             password: "12345678Hp",
//           }),
//         }
//       );

//       const data = await response.json();
//       console.log(data);

//       if (data.refresh && data.access) {
//         // Agar foydalanuvchi ro'yxatdan o'tgan bo'lsa, kirishga ruxsat bering
//         // "/dashboard";

//         return true;
//       } else {
//         // Aks holda, kirishni rad

//         return "/auth/register"; // Ro'yxatdan o'tish sahifasiga yo'naltiring
//       }
//     },
//   },
// });

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
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.accessToken && user?.refreshToken) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken && token?.refreshToken) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const response = await fetch(
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

        console.log(data);

        if (data.refresh && data.access) {
          return true;
        } else {
          return "/auth/register";
        }
      }
      return true;
    },
  },
});

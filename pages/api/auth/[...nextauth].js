import NextAuth, { getServerSession } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// import { verifyPassword } from "../../../backend-stuff/password";
// import { connectToDatabase } from "../../../backend-stuff/db";
// import { getToken } from "next-auth/jwt";
// import { getSession } from "next-auth/react";
// import secureLocalStorage from "react-secure-storage";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        // console.log({ ACCOUNT: account, PROFILE: profile });

        // return true;
   

        return profile;
      }

      // return true // Do different verification for other providers that don't have `email_verified`
    },

    jwt: async ({
      token,
      user,
      account,
      profile,
    }) => {
      // const {data: session} = getSession()

      if (user) {
        token = { ...account, ...profile };
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        // console.log(token);
        session = { ...token };

        session.user = null;
      }

      return session;
    },
  },
  secret: process.env.JWT_SECRET,
  jwt: {
    // secureCookie: false,
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
};

export default NextAuth(authOptions);

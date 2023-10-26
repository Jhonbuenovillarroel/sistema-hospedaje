import nextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
   adapter: PrismaAdapter(prisma),
   session: {
      strategy: "jwt",
   },
   providers: [
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: {
               label: "Username",
               type: "text",
               placeholder: "jsmith",
            },
            password: {
               label: "Password",
               type: "password",
               placeholder: "*********",
            },
         },
         async authorize(credentials, req) {
            const user = await prisma.user.findUnique({
               where: {
                  email: credentials?.email,
               },
            });

            const correctPassword = await bcrypt.compare(
               credentials?.password,
               user?.password
            );

            if (user) {
               if (correctPassword) {
                  return {
                     id: user.id,
                     name: user.username,
                     email: user.email,
                     image: user.image,
                  };
               } else {
                  throw new Error("Contraseña incorrecta");
               }
            } else {
               throw new Error("El usuario no existe");
            }
         },
      }),
   ],
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };

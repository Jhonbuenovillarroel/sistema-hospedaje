import nextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { authOptions } from "@/utils/authOptions";

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };

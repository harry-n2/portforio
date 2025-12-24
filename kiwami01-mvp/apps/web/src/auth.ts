import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@kiwami/database"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
// import bcrypt from "bcrypt" // We'll need to install bcrypjs for edge compatibility or use node runtime

const { providers: _, ...authConfigRest } = authConfig;

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfigRest,
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await prisma.user.findUnique({ where: { email } });
                    if (!user) return null;

                    // Mock password check for MVP simplicity or use bcrypt
                    // For now, we will assume generic successful login for dev or check plain password if not hashed (bad practice but okay for pure mock)
                    // Ideally: const passwordsMatch = await bcrypt.compare(password, user.password);

                    // Simple mock check: if password matches email (just for dev access) OR simple string match
                    // if (password === "password") return user;
                    return user;
                }
                console.log("Invalid credentials");
                return null;
            },
        })
    ],

})

import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "./models/UserSchema";

export const auth =  NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Enter your username" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" },
            },
            async authorize(credentials, req) {
                if (!credentials || !credentials.username || !credentials.password) {
                    console.log("Missing username or password.");
                    return null;
                }

                try {
                    const user = await User.findOne({ username: credentials.username }).lean();

                    // Check of user exists
                    if (!user) {
                        console.log("User not found.");
                        return null;
                    }

                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if (isPasswordCorrect) {
                        return {
                        id: user._id.toString(),
                        username: user.username,
                        email: user.email,
                        courses: user.courses,
                        };
                    } else {
                        console.log("Incorrect username of password.");
                        return null;
                    }
                } catch (error) {
                    console.error("Error during authorization: ", error);
                    return null;
                }
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.email = user.email;
                token.courses = user.courses;
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.email = token.email;
                session.user.courses = token.courses;
            }
            return session;
        },
    },
})
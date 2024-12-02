import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "./models/UserSchema";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    ... authConfig,
    providers: [
        CredentialsProvider({
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials) return null;

                try {
                    const user = await User.findOne({ username: credentials.username }).lean();

                    if (user) {
                        const isMatch = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        if (isMatch) {
                            return {
                                id: user._id.toString(),
                                username: user.username,
                                email: user.email,
                                courses: user.courses,
                            };
                        } else {
                            console.log("Email or Password is not correct");
                            return null;
                        }
                    } else {
                        console.log("Email or Password is not correct");
                        return null;
                    }
                } catch (error) {
                    console.error("Error during authorization: ", error);
                    return null;
                }
            },
        }),
    ],
})
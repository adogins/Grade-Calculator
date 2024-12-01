import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "./models/UserSchema";

export const {
    handlers: {GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            credentials: {
                username: {label: "Username", type: "text", placeholder: "Enter your username"},
                password: {label: "Password", type: "password", placeholder: "Enter your password"},
            },
            async authorize(credentials) {
                if (!credentials || !credentials.username || !credentials.password){
                    console.log("Missing username or password");
                    return null;
                }

                try {
                    const user = await User.findOne({ username: credentials.username }).lean();

                    if (user) {
                        const pw = bcrypt.hash(credentials.password, 7);
                        const isMatch = await bcrypt.compare(
                           pw,
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
                            console.log("Username or Password is not correct");
                            return null;
                        }
                    } else {
                        console.log("User not found");
                        return null;
                    }
                } catch (error: any) {
                    console.log("An error occurred: ", error);
                    return null;
                }
            },
        }),
    ],
});

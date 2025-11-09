import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User } from "@/app/models/user";
import dbConnect from "@/libs/dbConnection";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ profile }) {
      await dbConnect();
      if (!profile?.email) {
        throw new Error("No profile");
      }

      const user: any = await User.findOne({ email: profile.email });
      if (!user) {
        const user = new User({
          name: profile.name,
          email: profile.email,
        });
        await user.save();
      } else {
        user.name = profile.name;
        await user.save();
      }
      return true;
    },

    async jwt({ account, profile, token }) {
      const user: any = await User.findOne({ email: profile?.email });
      if (account) {
        token.accessToken = account?.access_token;
        token.idToken = account?.id_token;
        if (user) {
          token.userId = user._id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      await dbConnect();
      const dbUser = await User.findOne({ email: session.user?.email });
      if (dbUser) {
        session.accessToken = token.accessToken as string;
        session.idToken = token.idToken as string;
        (session.user as any).id = dbUser._id.toString();
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as POST, handler as GET };

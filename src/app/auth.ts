import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard =
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/cards");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // 로그인하지 않은 상태에서 대시보드에 접근하려 하면 로그인 페이지로 리다이렉트
      } else if (isLoggedIn) {
        return true;
      }
      return true;
    },
  },
});

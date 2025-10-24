import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only allow specific admin emails
      const adminEmails = [
        'erosdelphin@gmail.com', // Add your admin email here
        process.env.ADMIN_EMAIL, // Allow admin email from env
        // Add more admin emails as needed
      ].filter(Boolean); // Remove undefined values
      
      console.log('SignIn attempt:', { email: user.email, adminEmails });
      
      if (user.email && adminEmails.includes(user.email)) {
        return true;
      }
      
      console.log('Access denied for:', user.email);
      return false; // Deny access for non-admin users
    },
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      return token;
    },
  },
  pages: {
    signIn: '/admin-login',
    error: '/admin-login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
})

export { handler as GET, handler as POST }

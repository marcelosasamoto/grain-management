import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import Usuario from "@/models/Usuario";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("Please provide process.env.NEXTAUTH_SECRET");
}

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const usuario = await Usuario.findOne({
          where: { email: credentials?.email },
        });

        if (usuario && credentials?.senha) {
          const senhaCorreta = await bcryptjs.compare(credentials.senha, usuario.senha);
          if (senhaCorreta) {
            return {
              id: usuario.id,
              nome: usuario.nome,
              clienteId: usuario.clienteId,
              nivel_acesso: usuario.nivel_acesso,
            };
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy:'jwt',
    maxAge: 60 * 60 * 4, // 4 horas
    updateAge: 60 * 60, // Atualizar a cada 1 hora
  },
  
  callbacks: {
    async jwt({ token, user }:any) {
      if (user) {
        token.userId = user.id
        token.clienteId = user.clienteId
        token.nivel_acesso = user.nivel_acesso
      }
      return token;
    },
    async session({ session, token }:any) {
      if (session.user && token.nivel_acesso) {
        session.user.nivel_acesso = token.nivel_acesso;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Página de login
  },
});

export { handler as GET, handler as POST };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Defina um tipo para o token decodificado
interface DecodedToken {
  clienteId: string;
  userId: string;
  nivel_acesso: string;
}

// Função do middleware para verificar o token de autenticação
export async function middleware(req: NextRequest, res: NextResponse) {
  try {
    // Obtendo o token de autenticação
    const tokenDecoded = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    }) as DecodedToken | null; // Tipo explícito com possibilidade de ser null

    // Verificando se o token foi decodificado corretamente
    if (!tokenDecoded) {
      throw new Error('Token de autenticação inválido ou ausente');
    }

    const { pathname } = req.nextUrl;

    // Verificando o acesso à página de login
    if (pathname === "/login" && tokenDecoded) {
      return NextResponse.redirect(new URL("/", req.url)); // Redireciona para a página inicial
    }

    // Se o token estiver presente, define os headers com informações do token
    const response = NextResponse.next();
    
    response.headers.set('x-cliente-id', tokenDecoded ? tokenDecoded.clienteId : '');
    response.headers.set('x-nivel-acesso', tokenDecoded ? tokenDecoded.nivel_acesso : '');
    response.headers.set('x-user-id', tokenDecoded ? tokenDecoded.userId : '');


    return response;

  } catch (error) {
    console.error('Erro ao verificar token de autenticação:', error);
    return new NextResponse("Erro no middleware de autenticação", { status: 500 });
  }
}

// Ajustar as rotas no matcher para cobrir todas as rotas que precisam ser protegidas
export const config = {
  matcher: [
    "/",                 // Página inicial
    "/silos/:path*",            // Rota para silos
    "/api/protected/:path*"  // Rotas API protegidas que precisam de autenticação
  ],
};

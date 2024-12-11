import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { DecodedToken } from "./utils/getParserToken";


// Função do middleware para verificar o token de autenticação
export async function middleware(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl;

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
    // Verificando o acesso à página de login
    else if (pathname === "/login" && tokenDecoded) {
      return NextResponse.redirect(new URL("/", req.url)); // Redireciona para a página inicial
    }
    // Se o token estiver presente, define os headers com informações do token
    const response = NextResponse.next();
    // Adiciona o x-user no cookie com uma configuração segura (não expõe no navegador)
    response.cookies.set('x-user', JSON.stringify({
      user_id: tokenDecoded.user_id,
      cliente_id: tokenDecoded.cliente_id,
      nivel_acesso: tokenDecoded.nivel_acesso
    }), {
      httpOnly: true,  // Garante que só pode ser acessado pelo servidor
      secure: process.env.NODE_ENV == 'production' ? true : false,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 4, // Expira em 4 horas

    });
    return response;

  } catch (error) {
    console.log('wo', pathname)
    if (pathname.startsWith('/api')) {
      return NextResponse.json({ message: "error token invalido" }, { status: 401 })
    }
    console.error('Erro ao verificar token de autenticação:', error);
    const loginUrl = new URL('/login', req.url); // URL da página de login
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname); // Adiciona a URL atual como callback

    return NextResponse.redirect(loginUrl)
  }
}

// Ajustar as rotas no matcher para cobrir todas as rotas que precisam ser protegidas
export const config = {
  matcher: [
    "/",                 // Página inicial
    "/silos/:path*",            // Rota para silos
    "/api/protected/:path*",  // Rotas API protegidas que precisam de autenticação
    "/api/protected/silos/movimentacao:path*"  // Rotas API protegidas que precisam de autenticação

  ],
};

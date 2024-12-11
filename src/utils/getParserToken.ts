import type { NextRequest } from "next/server";

export interface DecodedToken {
    cliente_id: string;
    user_id: string;
    nivel_acesso: string;
}

export function getParserToken(req: NextRequest): DecodedToken {
    // Tenta obter o valor do cookie 'x-user'
    const token = req.cookies.get("x-user")?.value;
    // Lança um erro se o cookie estiver ausente
    if (!token) {
        throw new Error("getParserToken Error: Token do middleware tem algum problema");
    }

    try {
        // Tenta fazer o parse do token como JSON
        const decoded: DecodedToken = JSON.parse(token);

        // Verifica se os campos essenciais estão presentes
        if (!decoded.cliente_id || !decoded.user_id || !decoded.nivel_acesso) {
            console.log(decoded.cliente_id, decoded.user_id, decoded.nivel_acesso)
            throw new Error("Token de autenticação malformado no middelware");
        }

        return decoded; // Retorna o token decodificado
    } catch (error) {
        throw new Error("getParserToken Error: Falha decodificar token middleware: " + error);
    }
}

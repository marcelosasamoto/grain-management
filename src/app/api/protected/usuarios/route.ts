import { NextRequest, NextResponse } from 'next/server';
import { Usuario, UsuarioInterface } from '@/models/Usuario';
import { getParserToken,DecodedToken } from '@/utils/getParserToken';

// Listar usuarios (GET)
export async function GET(req: NextRequest) {
    try {
       // const decodedToken = getParserToken(req)
        const usuarios = await Usuario.findAll({
            where: {
                //cliente_id: decodedToken.cliente_id
            }
        });
        return NextResponse.json(usuarios);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Erro ao listar usuarios.' }, { status: 500 });
    }
}

// Criar cliente (POST)
export async function POST(req: NextRequest) {

    try {
        
        /* const body: UsuarioInterface = await req.json();
        const usuarios = await Usuario.create({
            nome: body.nome,
            email: body.email,
            senha: body.senha,
            nivel_acesso: body.nivel_acesso,
            cliente_id: info.cliente_id === "Root" ? body.cliente_id : info.cliente_id      // Somente usuario Root pode criar usuarios de outros/novo clientes
        });
        return NextResponse.json(usuarios, { status: 201 }); */
        return NextResponse.json({a:1})
    } catch (error: any) {
        console.log('\n\nerror', error.errors)
        if (error.errors) { // Código de erro para duplicate key
            return NextResponse.json({ error: error.errors[0].message }, { status: 409 }); // Retorna o error de chave duplicada
        }
        else {
            return NextResponse.json({ error: 'Erro ao atualizar cliente.' }, { status: 400 });
        }
    }
}





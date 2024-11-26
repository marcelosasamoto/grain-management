import { NextResponse, NextRequest } from 'next/server';
import { Usuario, UsuarioInterface } from '@/models/Usuario';
import db from 'src/config/database';

// Mostrar Usuario por ID (GET)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return NextResponse.json({ error: 'usuario não encontrado' }, { status: 404 });
        }
        return NextResponse.json(usuario);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar usuario' }, { status: 500 });
    }
}

// Atualizar Usuario (PUT)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    try {
        const body = await req.json()
        const client_up: UsuarioInterface = {
            nome: body.nome,
            email: body.email,
            senha: body.senha,
            nivel_acesso:body.nivel_acesso,
            clienteId:body.clienteId
        }
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return NextResponse.json({ error: 'usuario não encontrado.' }, { status: 404 });
        }

        await usuario.update(client_up);
        return NextResponse.json(usuario);
    } catch (error: any) {
        if (error.parent?.code === '23505') { // Código de erro para duplicate key
            return NextResponse.json({ error: error.fields }, { status: 409 }); // Retorna o error de chave duplicada
        }
        else {
            return NextResponse.json({ error: 'Erro ao atualizar usuario.' }, { status: 400 });
        }
    }
}



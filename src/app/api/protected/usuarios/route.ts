import { NextResponse } from 'next/server';
import { Usuario, UsuarioInterface } from '@/models/Usuario';
import db from 'src/config/database';

// Listar usuarios (GET)
export async function GET(req: Request) {
    try {
        const usuarios = await Usuario.findAll();
        return NextResponse.json(usuarios);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Erro ao listar usuarios.' }, { status: 500 });
    }
}

// Criar cliente (POST)
export async function POST(req: Request) {

    try {
        const body: UsuarioInterface = await req.json();
        const usuarios = await Usuario.create(body);
        return NextResponse.json(usuarios, { status: 201 });
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





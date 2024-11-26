import { NextResponse } from 'next/server';
import { Cliente, ClienteInterface } from '@/models/Cliente';
import db from 'src/config/database';

// Listar clientes (GET)
export async function GET(req: Request) {
    try {
        const clientes = await Cliente.findAll();
        return NextResponse.json(clientes);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Erro ao listar clientes.' }, { status: 500 });
    }
}

// Criar cliente (POST)
export async function POST(req: Request) {

    try {
        const body: ClienteInterface = await req.json();

        const cliente = await Cliente.create(body);
        return NextResponse.json(cliente, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao criar cliente.' }, { status: 400 });
    }
}

// Atualizar cliente (PUT)
export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, ...data } = body;

        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return NextResponse.json({ error: 'Cliente não encontrado.' }, { status: 404 });
        }

        await cliente.update(data);
        return NextResponse.json(cliente);
    } catch (error:any) {
        console.log('error client',error)
        if (error.parent?.code === '23505') { // Código de erro para duplicate key
            return NextResponse.json({ error: error.fields }, { status: 409 }); // Retorna o error de chave duplicada
        }
        else {
            return NextResponse.json({ error: 'Erro ao atualizar cliente.' }, { status: 400 });
        }
    }
}



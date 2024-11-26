import { NextResponse, NextRequest } from 'next/server';
import { Cliente, ClienteInterface } from '@/models/Cliente';
import db from 'src/config/database';

// Mostrar Cliente por ID (GET)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
        }
        return NextResponse.json(cliente);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar cliente' }, { status: 500 });
    }
}

// Atualizar Cliente (PUT)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    try {
        const body = await req.json()
        const client_up: ClienteInterface = {
            nome: body.nome,
            tipo_documento: body.tipo_documento,
            numero_documento: body.numero_documento
        }
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return NextResponse.json({ error: 'Cliente não encontrado.' }, { status: 404 });
        }

        await cliente.update(client_up);
        return NextResponse.json(cliente);
    } catch (error: any) {
        if (error.parent?.code === '23505') { // Código de erro para duplicate key
            return NextResponse.json({ error: error.fields }, { status: 409 }); // Retorna o error de chave duplicada
        }
        else {
            return NextResponse.json({ error: 'Erro ao atualizar cliente.' }, { status: 400 });
        }
    }
}



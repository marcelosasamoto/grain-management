import { NextResponse, NextRequest } from 'next/server';
import { Silo, SiloInterface } from '@/models/Silo';
import { NextApiRequest } from 'next';

// Listar Silos (GET)
export async function GET(req: Request) {
  try {
    const Silos = await Silo.findAll();
    return NextResponse.json(Silos);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Erro ao listar Silos.' }, { status: 500 });
  }
}

// Criar cliente (POST)
export async function POST(req: NextApiRequest) {
  const clienteId = req.headers['x-cliente-id'];
  const nivelAcesso = req.headers['x-nivel-acesso'];
  const userId = req.headers['x-user-id'];
  try {
    const body: SiloInterface = await req.body
    console.log('body', body, '\n\ncliente', clienteId, nivelAcesso)                          // Falta alterar para usar where clienteId e updatedBy
    const Silos = await Silo.create(body);
    return NextResponse.json(Silos, { status: 201 });
  } catch (error: any) {
    console.log('\n\nerror', error)
    if (error.errors) { // Código de erro para duplicate key
      return NextResponse.json({ error: error.errors[0].message }, { status: 409 }); // Retorna o error de chave duplicada
    }
    else {
      return NextResponse.json({ error: 'Erro ao atualizar cliente.' }, { status: 400 });
    }
  }
}





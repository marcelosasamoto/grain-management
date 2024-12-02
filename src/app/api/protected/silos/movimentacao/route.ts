import { NextRequest, NextResponse } from 'next/server';
import { Movimentacao, MovimentacaoSiloInterface } from '@/models/MovimentacaoSilo';
import { NextApiRequest } from 'next';

// Listar Movimentacaos (GET)
export async function GET(req: Request) {
  try {
    const Movimentacaos = await Movimentacao.findAll();
    return NextResponse.json(Movimentacaos);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Erro ao listar Movimentacaos.' }, { status: 500 });
  }
}

// Criar cliente (POST)
export async function POST(req: NextRequest) {

  const body = await req.json()
  if (body.quantidade < 0) {
    return NextResponse.json({ error: "Quantidade não pode ser menor que 0" }, { status: 409 })
  }
  const clienteId = req.headers.get('x-cliente-id') as string
  const userId = req.headers.get('x-user-id') as string
  const nivel_acesso = req.headers.get('x-nivel-acesso') as string
  try {
    const Movimentacaos = await Movimentacao.create({
      siloId: body.siloId,
      quantidade: body.quantidade,
      tipo: body.tipo,
      clienteId: clienteId,
      createdBy: userId
    });
    return NextResponse.json(Movimentacaos, { status: 201 });
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





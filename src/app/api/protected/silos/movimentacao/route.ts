import { NextRequest, NextResponse } from 'next/server';
import Movimentacao, { MovimentacaoSiloInterface } from '@/models/MovimentacaoSilo';
import { NextApiRequest } from 'next';
import { getParserToken } from '@/utils/getParserToken'; 
import Cliente from '@/models/Cliente';

// Listar Movimentacaos (GET)
export async function GET(req: NextRequest) {
  try {
    const decodedToken = getParserToken(req)
    const Movimentacaos = await Movimentacao.findAll({
      where: {
        cliente_id:decodedToken.cliente_id
      },
      include: [
        {
          model: Cliente,
          attributes: ['id','nome']
        }
      ]
    });
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
  const decodedToken = getParserToken(req)
  try {
    const Movimentacaos = await Movimentacao.create({
      silo_id: body.silo_id,
      quantidade: body.quantidade,
      tipo: body.tipo,
      cliente_id: decodedToken.cliente_id,
      created_by: decodedToken.user_id
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
export async function PUT( req: NextRequest){
  const body = await req.json()
  const id = req.nextUrl.searchParams.get('id')
  console.log('params',id)
  try {
    
  } catch (error) {
    
  }

  return NextResponse.json({id})
}




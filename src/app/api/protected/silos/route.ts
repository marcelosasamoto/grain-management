import { NextResponse, NextRequest } from 'next/server';
import { Silo, SiloInterface } from '@/models/Silo';
import { getParserToken } from '@/utils/getParserToken';

// Listar Silos (GET)
export async function GET(req: NextRequest) {

  try {
    const decodedToken = getParserToken(req)
    const id = req.nextUrl.searchParams.get('id')
    console.log('okasd', decodedToken)
    if (id) {
      const silo = await Silo.findAll({
        where: {
          cliente_id: decodedToken.cliente_id,
          id: id
        }
      })
      if (!silo) {
        return NextResponse.json({ error: 'Silo não encontrado' }, { status: 404 });
      } else {
        return NextResponse.json(silo);
      }
    }
    else {
      const Silos = await Silo.findAll({
        where: {
          cliente_id: decodedToken.cliente_id,
        }
      });
      return NextResponse.json(Silos);
    }

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Erro ao listar Silos.' }, { status: 500 });
  }
}

// Criar cliente (POST)
export async function POST(req: NextRequest) {
  const decodedToken = getParserToken(req)
  try {
    const body: SiloInterface = await req.json()                       // Falta alterar para usar where cliente_id e updatedBy
    const Silos = await Silo.create({
      nome: body.nome,
      capacidade_total: body.capacidade_total,
      capacidade_atual: body.capacidade_atual,
      cliente_id: decodedToken.cliente_id,
      updated_by: decodedToken.user_id
    });
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

export async function PUT(req: NextRequest) {
  const decodedToken = getParserToken(req)
  const id = req.nextUrl.searchParams.get('id')
  try {
    if (!id) { throw new Error('Id não fornecido') }

    const body = await req.json()
    const silos = await Silo.findOne({
      where: {
        id: id,
        cliente_id: decodedToken.cliente_id
      }
    })
    if (!silos) {
      return NextResponse.json({ error: 'Silo não encontrado.' }, { status: 404 });
    }

    await silos?.update({
      nome: body.nome,
      capacidade_total: body.capacidade_total,
      updated_by: decodedToken.user_id
    })
    return NextResponse.json(silos)
  } catch (error: any) {

  }
}



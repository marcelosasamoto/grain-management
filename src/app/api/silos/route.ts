import { NextResponse } from 'next/server';

type Silo = {
  id: number;
  nome: string;
  capacidade_total: number;
  capacidade_atual: number;
};

type Movimentacao = {
  id: number;
  tipo: 'entrada' | 'saida';
  peso: number;
  silo: string;
  data: string;
};

const silos: Silo[] = [
  { id: 1, nome: 'Silo 1', capacidade_total: 80000, capacidade_atual: 10000 },
  { id: 2, nome: 'Silo 2', capacidade_total: 80000, capacidade_atual: 78000 },
  { id: 3, nome: 'Silo 3', capacidade_total: 120000, capacidade_atual: 100000 },
  { id: 4, nome: 'Silo 4', capacidade_total: 120000, capacidade_atual: 120000 },
  { id: 5, nome: 'Silo 5', capacidade_total: 120000, capacidade_atual: 0 },
];

const movimentacoes: Movimentacao[] = [];

// GET: Lista os silos e as movimentações
export async function GET() {
  return NextResponse.json({ silos, movimentacoes });
}

// POST: Adiciona uma entrada ou saída de grãos
export async function POST(req: Request) {
  //const clientId = req.headers.get('x-client-id');

  const body = await req.json();

  if (!body.tipo || !body.peso || !body.silo) {
    return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
  }

  const silo = silos.find((s) => s.nome === body.silo);

  if (!silo) {
    return NextResponse.json({ error: 'Silo não encontrado' }, { status: 404 });
  }

  if (body.tipo === 'entrada') {
    silo.capacidade_atual += body.peso;
  } else if (body.tipo === 'saida') {
    if (silo.capacidade_atual < body.peso) {
      return NextResponse.json({ error: 'Peso insuficiente no silo' }, { status: 400 });
    }
    silo.capacidade_atual -= body.peso;
  } else {
    return NextResponse.json({ error: 'Tipo inválido' }, { status: 400 });
  }

  movimentacoes.push({
    id: movimentacoes.length + 1,
    tipo: body.tipo,
    peso: body.peso,
    silo: body.silo,
    data: new Date().toUTCString(),
  });

  return NextResponse.json({ success: true });
}

// PUT: Atualiza os dados de um silo
export async function PUT(req: Request) {
  const body = await req.json();

  if (!body.id || !body.capacidade_total) {
    return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
  }

  const silo = silos.find((s) => s.id === body.id);

  if (!silo) {
    return NextResponse.json({ error: 'Silo não encontrado' }, { status: 404 });
  }

  silo.capacidade_atual = body.capacidade_atual;


  return NextResponse.json({ success: true });
}

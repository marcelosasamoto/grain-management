import { NextResponse } from 'next/server';
import { generateToken } from '@/app/utils/jwt';
import { Usuario } from '@/models'; // Modelo de usuários do Sequelize

export async function POST(req: Request) {
  const { email, senha } = await req.json();

  const user = await Usuario.findOne({ where: { email } });

  if (!user || user.senha !== senha) {
    return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
  }

  const token = generateToken({
    userId: user.id,
    clientId: user.clienteId,
    nivelAcesso: user.nivel_acesso,
  });

  return NextResponse.json({ token });
}

import { getImageByEmail } from "@/interfaces/checkEmail.interface";
import { decryptJWT } from "@/services/decryptJWT.service";
import { TokenExpiredError } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const token = data.token; // Extrai o token do corpo da requisição

    const decryptedToken: getImageByEmail | null = await decryptJWT(token);
    if (decryptedToken) {
      return NextResponse.json({ decryptedToken });
    } else {
      return NextResponse.json({ error: 'Token inválido' }); // Retorna erro de token inválido
    }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return NextResponse.json({ error: 'Token expirado' }); // Retorna erro de token expirado
    } else {
      console.error('Erro ao descriptografar token:', error);
      return NextResponse.json({ error: 'Erro interno do servidor' }); // Retorna erro interno do servidor
    }
  }
}

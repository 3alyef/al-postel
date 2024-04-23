import { getImageByEmail } from "@/interfaces/checkEmail.interface";
import { decryptJWT } from "@/services/decryptJWT.service";
import { NextResponse } from "next/server";

export async function POST (request: Request){
  const data = await request.json()
  try {
    //console.log(data);
    const token = data.token; // Extrai o token do corpo da requisição
    
    const decryptedToken: getImageByEmail | null = await decryptJWT(token);
    if (decryptedToken) {
      return NextResponse.json({ decryptedToken });
    } else {
      return NextResponse.json({ error: 'Token inválido' }); // Retorna erro de token inválido
    }
  } catch (error) {
    console.error('Erro ao descriptografar token:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }); // Retorna erro interno do servidor
  }
  
}
/*

  */
import { tokenGetImageByEmail } from "@/interfaces/checkEmail.interface";
import checkEmail from "./checkEmail.service";
import { Dispatch, SetStateAction } from "react";
import { validateToken } from "./validateToken.service";
import { Locale } from "@/i18n"; 



export const verifyAll = async (locale: Locale, emailValue: string, setProcessErrorStyle: Dispatch<SetStateAction<boolean>>): Promise<boolean> => {
    const token = localStorage.getItem(emailValue); // Obtém o token do armazenamento local
    if (token) {
        return await verifyToken(locale, token, emailValue, setProcessErrorStyle); // Se houver token, verifica-o
    } else {
        return await registerToken(locale, emailValue, setProcessErrorStyle); // Se não houver token, registra um novo 
    }
}

const registerToken = async (locale: Locale, emailValue: string, setProcessErrorStyle: Dispatch<SetStateAction<boolean>>) => {
    const emailDataUser: tokenGetImageByEmail | null = await checkEmail(emailValue); // Verifica o e-mail para obter um novo token
    if (emailDataUser) {
        return await verifyToken(locale, emailDataUser.token, emailValue, setProcessErrorStyle); // Verifica o token obtido
    } else {
        setProcessErrorStyle(true);
        return false // Se o e-mail não existir, define o estilo de erro
    }
}

const verifyToken = async (locale: Locale, token: string, emailValue: string, setProcessErrorStyle: Dispatch<SetStateAction<boolean>>): Promise<boolean> => {
    try {
        const tokenDecrypted = await validateToken(token); // Valida o token
        if ("decryptedToken" in tokenDecrypted) { // Se o token for válido
            localStorage.setItem("userEmailToLogin", emailValue); // Armazena o e-mail do usuário

            localStorage.setItem(emailValue, token); // Deposita o token encriptado no localStorage

            if (tokenDecrypted.decryptedToken.image) { // Se houver uma imagem associada ao token
                localStorage.setItem("imagemUserToPreLogin", tokenDecrypted.decryptedToken.image); // Armazena a imagem do usuário
            }
            return true // Redireciona para a próxima página
        } else {
            return await handleTokenError(locale, emailValue, setProcessErrorStyle, tokenDecrypted.error); // Se houver um erro de token
        }
    } catch (error) {
        // Registra qualquer erro no console
        return await handleTokenError(locale, emailValue, setProcessErrorStyle, "Internal server error"); // Trata erros internos do servidor
    }
}

const handleTokenError = async (locale: Locale, emailValue: string, setProcessErrorStyle: Dispatch<SetStateAction<boolean>>, error: string): Promise<boolean> => {
    if (error === "Token expirado" || error === "Token inválido") { // Se o token expirou ou é inválido
        localStorage.removeItem(emailValue); // Remove o token do armazenamento local
        return await verifyAll(locale, emailValue, setProcessErrorStyle); // Verifica novamente o token <====
    } else {
        setProcessErrorStyle(true); // Define o estilo de erro
        return false
    }
}

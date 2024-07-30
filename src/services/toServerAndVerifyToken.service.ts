import { tokenGetImageByEmail } from "@/interfaces/checkEmail.interface";
import checkEmail from "./checkEmail.service";
import { Dispatch, SetStateAction } from "react";
import { validateToken } from "./validateToken.service";
import { Locale } from "@/i18n"; 

interface PropsVerifyAll {
    locale: Locale;
    emailValue: string;
    setProcessErrorStyle: Dispatch<SetStateAction<boolean>>;
    isPassword: boolean;
    setPasswordScreen: Dispatch<SetStateAction<boolean>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

export const verifyAll = async ({emailValue, isPassword, locale, setProcessErrorStyle, setPasswordScreen, setLoading}: PropsVerifyAll): Promise<boolean> => {
    /*const token = localStorage.getItem(emailValue); // Obtém o token do armazenamento local
    if (token) {
        return await verifyToken({locale, emailValue, setProcessErrorStyle, isPassword, setPasswordScreen, token}); // Se houver token, verifica-o
    } else {*/
        setLoading(true);
        return await registerToken({locale, emailValue, setProcessErrorStyle, isPassword, setPasswordScreen, setLoading}); // Se não houver token, registra um novo 
    //}
}

const registerToken = async ({emailValue, isPassword, locale, setPasswordScreen, setProcessErrorStyle, setLoading}: PropsVerifyAll) => {
    const emailDataUser: tokenGetImageByEmail | null = await checkEmail(emailValue); // Verifica o e-mail para obter um novo token
    if (emailDataUser) {
        return await verifyToken({locale, token: emailDataUser.token, emailValue, setProcessErrorStyle, isPassword, setPasswordScreen, setLoading}); // Verifica o token obtido
    } else {
        //setPasswordScreen(false);
        setProcessErrorStyle(true);
        return false // Se o e-mail não existir, define o estilo de erro
    }
}


const verifyToken = async ({emailValue, isPassword, locale, setPasswordScreen, setProcessErrorStyle, token, setLoading}: PropsVerifyAll & {token: string}): Promise<boolean> => {
    try {
        const tokenDecrypted = await validateToken(token); // Valida o token
        if ("decryptedToken" in tokenDecrypted) { // Se o token for válido
            localStorage.setItem("userEmailToLogin", emailValue); // Armazena o e-mail do usuário

            localStorage.setItem(emailValue, token); // Deposita o token encriptado no localStorage

            if (tokenDecrypted.decryptedToken.image) { // Se houver uma imagem associada ao token
                localStorage.setItem("imagemUserToPreLogin", tokenDecrypted.decryptedToken.image); // Armazena a imagem do usuário
            } else {
                localStorage.removeItem("imagemUserToPreLogin")
            }
            setPasswordScreen(true);
            setLoading(false);
            return true 
        } else {
            return await handleTokenError({locale, emailValue, setProcessErrorStyle, error: tokenDecrypted.error, isPassword, setPasswordScreen, setLoading}); // Se houver um erro de token
        }
    } catch (error) {
        // Registra qualquer erro no console
        return await handleTokenError({locale, emailValue, setProcessErrorStyle, error: "Internal server error", isPassword, setPasswordScreen, setLoading}); // Trata erros internos do servidor
    }
}

const handleTokenError = async ({emailValue, isPassword, locale, setPasswordScreen, setProcessErrorStyle, error, setLoading}: PropsVerifyAll & {error: string} ): Promise<boolean> => {
    if (error === "Token expirado" || error === "Token inválido") { // Se o token expirou ou é inválido
        console.log("entrou no retry...")
        localStorage.removeItem(emailValue); // Remove o token do armazenamento local
        if(isPassword){
            //setPasswordScreen(false)
            return false;
        }
        return await verifyAll({locale, emailValue, setProcessErrorStyle, isPassword, setPasswordScreen, setLoading}); // Verifica novamente o token <====
    } else {
        setProcessErrorStyle(true);// Define o estilo de erro
        //setPasswordScreen(false) 
        return false
    }
}

"use server"
const jwt = require("jsonwebtoken");
import { getImageByEmail } from "@/interfaces/checkEmail.interface";

const decryptJWT = async (token: string): Promise<getImageByEmail | null> => {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY_ALPOSTEL);
        //console.log(decoded);
        return { image: decoded.image, lastUpdateIn: decoded.lastUpdateIn };
    } catch (err: any) {
        console.log(err);
    
        if (err && err.name === 'TokenExpiredError') {
            const error = { message: 'Token expirado', status: 401 };
            console.error(error);
            return null;
        } else {
            const error = { message: 'Autenticação falhou', status: 401 };
            console.error(error);
            return null;
        }
    }
}

export { decryptJWT };

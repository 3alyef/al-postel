"use client";
import { dataLoginToM1, TokenAuthenticate } from "./dataLoginToM1.service";
interface PropsLoginAsGuest {
    email: string;
    password: string;
}

export default async function loginAsGuest({email, password}: PropsLoginAsGuest): Promise<TokenAuthenticate | undefined>{
    const response: TokenAuthenticate | {message: string} = await dataLoginToM1({email, password});
    if(!("message" in response)){
        if(response.auth && response.token){
            return response;
        }
    }
    return 
}
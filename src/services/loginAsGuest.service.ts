"use client";
import { dataLoginToM1, tokenAuthenticate } from "./dataLoginToM1.service";
interface PropsLoginAsGuest {
    email: string;
    password: string;
}

export default async function loginAsGuest({email, password}: PropsLoginAsGuest): Promise<tokenAuthenticate | undefined>{
    const response: tokenAuthenticate | {message: string} = await dataLoginToM1({email, password});
    if(!("message" in response)){
        if(response.auth && response.token){
            return response;
        }
    }
    return 
}
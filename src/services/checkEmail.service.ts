import { tokenGetImageByEmail } from "@/interfaces/checkEmail.interface";

export default async function checkEmail(email: string): Promise<tokenGetImageByEmail | null> {
    try {
        const body = JSON.stringify({email: email})
        const response = await fetch(`${process.env.NEXT_PUBLIC_M1_URL}/login/email`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
        if(!response.ok){
            return null
        }
        const contain: tokenGetImageByEmail | null = await response.json();
        return contain
    } catch(erro) {
        return null
    }
}
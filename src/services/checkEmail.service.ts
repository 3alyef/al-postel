import { getImageByEmail } from "@/interfaces/checkEmail.interface";

export default async function checkEmail(email: string): Promise<getImageByEmail | null> {
    try {
        const body = JSON.stringify({email: email})
        const response = await fetch(`http://localhost:8282/login/email`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
        if(!response.ok){
            return null
        }
        const contain: getImageByEmail | null = await response.json();
        return contain
    } catch(erro) {
        return null
    }
}
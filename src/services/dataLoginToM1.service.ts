export interface tokenAuthenticate {
    auth: string;
    token: string;
    URL_M2: string;
}

export async function dataLoginToM1({email, password}: {email: string, password: string}): Promise<tokenAuthenticate | {message: string} >{
    try {
        const body = JSON.stringify({email, password})
        const response = await fetch(`${process.env.NEXT_PUBLIC_M1_URL}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })

        const data: tokenAuthenticate | {message: string} = await response.json();
        if("message" in data){
            throw {message: data.message};
        }

        return data;
    } catch(error) {
        console.error(error)
        const err = error as {message: string}
        return {message: err.message}
    }
}
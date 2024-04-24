export async function dataLoginToM1({email, password}: {email: string, password: string}): Promise<{token: string} | null>{
    try {
        const body = JSON.stringify({email, password})
        const response = await fetch(`${process.env.NEXT_PUBLIC_M1_URL}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
        if (!response.ok) {
            throw new Error();
        }
        const data: {token: string} | null = await response.json();
        if(!data){
            throw new Error("");
        }
        console.log(data)
        return data;
    } catch(error) {
        console.error(error)
        return null
    }
}
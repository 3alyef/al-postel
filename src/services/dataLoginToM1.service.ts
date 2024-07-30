export interface TokenAuthenticate {
    auth: string;
    token: string;
    URL_M2: string;
}

export async function dataLoginToM1({email, password}: {email: string, password: string}, retries = 5, delay = 7500): Promise<TokenAuthenticate | {message: string} >{
    const body = JSON.stringify({email, password});
    for (let attempt = 0; attempt < retries; attempt++) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7500);
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_M1_URL}/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body,
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            console.log("Veja, reinicio: ", response);
            const data: TokenAuthenticate | {message: string} = await response.json();

            if ("message" in data) {
                throw new Error(data.message);
            }

            return data;
        } catch (error) {
            clearTimeout(timeoutId);
            const errorMessage = (error as { message: string }).message || String(error);
            console.log(`Tentativa ${attempt + 1} falhou: ${errorMessage}`);

            if (attempt < retries - 1) {
                if (errorMessage.includes("Failed to fetch") || errorMessage === "signal is aborted without reason") {
                    await new Promise(resolve => setTimeout(resolve, delay));
                } else {
                    return { message: errorMessage };
                }
            } else {
                return { message: errorMessage || "Erro desconhecido" };
            }
        }
    }
    return { message: "error" };
    
}


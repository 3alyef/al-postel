export async function registerUser(fName: string, lName: string, email: string, password: string, repeatPassword: string): Promise<{message: string, status: number}>{

    try {
        //first_name, last_name, email, password, repeatPassword, image
        const body = JSON.stringify({first_name: fName, last_name: lName, email, password, repeatPassword})
        console.log(body)
        const response = await fetch(`${process.env.NEXT_PUBLIC_M1_URL}/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })

        if(!response.ok){
            throw {status: response.status, message: response.statusText}
        }
        const contain: {message: string, status: number} = await response.json();
        return contain
    } catch(err){
        const erro = err as {message: string, status: number}
        console.log(erro)
        return {message:  erro.message, status: erro.status}
    }
    
}
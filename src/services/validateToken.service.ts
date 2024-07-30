import { getImageByEmail } from "@/interfaces/checkEmail.interface";

export async function validateToken(token: string): Promise<{ decryptedToken: getImageByEmail } | { error: string }> {
    try {
        const body = JSON.stringify({ token: token });
        const response = await fetch("/api/decrypt-token", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        });

        if (!response.ok) {
            throw new Error();
        }

        const contain: { decryptedToken: getImageByEmail } | { error: string } = await response.json();

        if ('error' in contain) {
            console.log("Generating new token", contain.error)
            throw { error: contain.error };
        }

        //localStorage.setItem("imagemUserToPreLogin", contain.decryptedToken.image);
        return contain;
    } catch (error) {
        console.error(error);
        const err = error as { error: string };
        return err;
    }
}

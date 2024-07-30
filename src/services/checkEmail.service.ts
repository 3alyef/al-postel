import { tokenGetImageByEmail } from "@/interfaces/checkEmail.interface";

export default async function checkEmail(email: string, retries = 5, delay = 7500): Promise<tokenGetImageByEmail | null> {
    const body = JSON.stringify({ email });

    for (let attempt = 0; attempt < retries; attempt++) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7500);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_M1_URL}/login/email`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                return null;
            }

            const contain: tokenGetImageByEmail | null = await response.json();
            return contain;
        } catch (error) {
            clearTimeout(timeoutId);
            const errorMessage = (error as { message: string }).message || String(error);
            console.log(`Tentativa ${attempt + 1} falhou: ${errorMessage}`);
            if (attempt < retries - 1) {
                if (errorMessage.includes("Failed to fetch") || errorMessage.includes("signal is aborted without reason")) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
    }
    return null;
}

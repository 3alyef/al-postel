import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";
import { AlpostelMain } from "@/app/components/alpostelMain/alpostelMain";
async function handler() {
  try {
    let body = JSON.stringify({ data: new Date() });
    const response = await fetch(`https://al-postel-m2.onrender.com/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data.msg);
  } catch (error) {
      console.error('There was an error!', error);
  }

};

export default async function Alpostel({
  params: { locale }
}: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(locale);
  const _isSemitic: boolean = locale === "he";
  setInterval(async () => {
    await handler();
  }, 2 * 60 * 60 * 1000); 
  return <AlpostelMain _isSemitic={_isSemitic}/>
}

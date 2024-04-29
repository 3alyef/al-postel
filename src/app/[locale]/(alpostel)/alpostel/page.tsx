import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";
import { AlpostelMain } from "@/app/components/alpostelMain/alpostelMain";
export default async function Alpostel({
  params: { locale }
}: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(locale);
  const _isSemitic: boolean = locale === "he";
  
  return <AlpostelMain _isSemitic={_isSemitic}/>
}

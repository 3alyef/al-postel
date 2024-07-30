import LoginSection from "@/app/components/loginSection/loginSection";
import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";
export default async function Login({
  params: { locale }
}: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(locale);
  const _isSemitic: boolean = locale === "he";
  
  return (
    <LoginSection _isSemitic={_isSemitic} dictionary={dictionary} locale={locale}/>
  )
}

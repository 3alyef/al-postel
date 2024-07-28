import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";
import RegisterName from "@/app/components/registerName/registerName";
export default async function Login({
  params: { locale }
}: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(locale);
  const _isSemitic: boolean = locale === "he";

  return (
      <>  
        <RegisterName
        locale={locale}
        first_name={dictionary.Register.First_Name}
        last_name={dictionary.Register["Last_Name_(optional)"]}
        next={dictionary.Register.Next} already_have_an_account={dictionary.Register.Already_have_an_account}
        _isSemitic={_isSemitic}
        />      
      </>       
  );
}

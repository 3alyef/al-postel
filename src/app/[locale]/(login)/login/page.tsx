import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";
import FormEmailLogin from "@/app/components/formEmailLogin/formEmailLogin";
export default async function Login({
  params: { locale }
}: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(locale);
  const _isSemitic: boolean = locale === "he";

  return (
      <> 
        <section className="commomSectionMenu">
          deww
        </section>
        <section className="commomSectionMenu dataUser">
          <div className="dataUser_Container">
            <FormEmailLogin locale={locale} formCostumerClass="w-[85%]" textLabelEmail={dictionary.Login.Email} _isSemitic={_isSemitic} createAccount={dictionary.Login.Create_Account} forgotEmail={dictionary.Login.Forgot_your_email} next={dictionary.Login.Next}
            />  
          </div>
        </section>
      </>       
  );
}

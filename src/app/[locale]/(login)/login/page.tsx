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
          <div className=" inline-flex items-center text-white min-h-[5em] px-[1.2em] gap-2 font-semibold ">
            <div className="relative w-[2.85em] aspect-[1/1] pt-[.25em]">
              <h2 className={`text-[2em]`}>{dictionary.Login.Login}</h2>
            </div>
          </div>
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

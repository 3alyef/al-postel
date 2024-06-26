import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";
import DataUserFormEmail from "@/app/components/dataUserFormEmail/dataUserFormEmail";
export default async function Login({
  params: { locale }
}: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(locale);
  const _isSemitic: boolean = locale === "he";

  return (
      <> 
        <section className="commomSectionMenu">
          <div className=" inline-flex items-center text-white min-h-[5em] px-[1.2em] gap-2 font-semibold ">
            <div className="relative w-[2.85em] aspect-[1/1] pt-[.2em]">
              <h2 className={`text-[2em]`}>{dictionary.Login.Login}</h2>
            </div>
          </div>
        </section>
        <section className="commomSectionMenu dataUser">
          <div className="dataUser_Container">
            <DataUserFormEmail Create_Account={dictionary.Login.Create_Account} Email={dictionary.Login.Email} Forgot_your_email={dictionary.Login.Forgot_password} Next={dictionary.Login.Next} _isSemitic={_isSemitic} could_not_find_your_Al_PostEl_account={dictionary.Login.could_not_find_your_Al_PostEl_account} locale={locale}/>
          </div>
        </section>
      </>       
  );
}

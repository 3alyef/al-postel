import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";
import DataUserFormEmail from "@/app/components/dataUserFormEmail/dataUserFormEmail";
import RegisterName from "@/app/components/registerName/registerName";
export default async function Login({
  params: { locale }
}: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(locale);
  const _isSemitic: boolean = locale === "he";

  return (
      <> 
        <section className="commomSectionMenu">
          <div className=" inline-flex items-center text-white min-h-[5em] px-[1.2em] gap-2 font-semibold ">
            <div className="relative w-[90%] aspect-[1/1] pt-[.2em] flex items-center">
              <h2 className={`text-[1.75em] font-[500]`}>{dictionary.Register.Create_a_Al_Postel_Account}</h2>
            </div>
          </div>
        </section>
        <section className="commomSectionMenu dataUser">
          <div className="dataUser_Container">
            <RegisterName
            locale={locale}
            first_name={dictionary.Register.First_Name}
            last_name={dictionary.Register["Last_Name_(optional)"]}
            next={dictionary.Register.Next} already_have_an_account={dictionary.Register.Already_have_an_account}
            _isSemitic={_isSemitic}
            />
          </div>
        </section>
      </>       
  );
}

import DataUserForm from "@/app/components/dataUserForm/dataUserForm";
import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";
export default async function Singnin({
    params: { locale }
}:{ params: { locale: Locale }
}){

    const dictionary = await getDictionary(locale);
    const _isSemitic: boolean = locale === "he";
    return(
        <>
        
            <section className="commomSectionMenu flex items-start justify-center">
                <div className="flex items-center flex-col min-w-[200px]">
                    <h2 className="font-medium text-white text-[1.7em]">{dictionary.Login.Welcome}</h2>
                    
                </div>
            </section>
            <section className="commomSectionMenu dataUser">
            
                <div className="dataUser_Container flex flex-col items-center justify-center gap-2 ">
                    <DataUserForm Create_Account={dictionary.Login.Create_Account} Enter_your_password={dictionary.Login.Enter_your_password} Forgot_password={dictionary.Login.Forgot_password} Next={dictionary.Login.Next} _isSemitic={_isSemitic} locale={locale}
                    messageError={dictionary.Login.Incorrect_password}/>
                </div>
            </section>
        </>
    )
}
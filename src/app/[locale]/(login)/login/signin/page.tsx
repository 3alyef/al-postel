import FormPasswordLogin from "@/app/components/formPasswordLogin/formPasswordLogin";
import Test from "@/app/components/test";

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
                <div className="dataUser_Container flex flex-col items-center justify-center gap-2 mb-[1.85em]">
                    <div className="w-[100%]">
                        <Test locale={locale} _isSemitic={_isSemitic}/>
                    </div>
                    <FormPasswordLogin locale={locale} formCostumerClass="w-[85%]" _isSemitic={_isSemitic} textLabelPassword={dictionary.Login.Enter_your_password}
                    createAccount={dictionary.Login.Create_Account} 
                    forgotPassword={dictionary.Login.Forgot_password}
                    next={dictionary.Login.Next}
                    /> 
                </div>
            </section>
        </>
    )
}
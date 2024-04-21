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
            <section className="commomSectionMenu">
                <Test locale={locale}/>
            </section>
            <section className="commomSectionMenu dataUser">
                <div className="dataUser_Container">
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
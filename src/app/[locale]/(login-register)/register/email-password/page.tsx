import RegisterEmailPassword from "@/app/components/registerEmailPassword/registerEmailPassword";
import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";
export default async function EmailPassword({
    params: { locale }
}:{ params: { locale: Locale }
}){
    const dictionary = await getDictionary(locale);
    const _isSemitic: boolean = locale === "he";
    return(
        <>
            <RegisterEmailPassword locale={locale}/>      
        </>
    )
}
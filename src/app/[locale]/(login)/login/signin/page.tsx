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
        <Test/>
    )
}
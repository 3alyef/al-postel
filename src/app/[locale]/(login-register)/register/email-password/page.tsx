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
            <RegisterEmailPassword locale={locale}
            Confirm_your_password={dictionary.Register.Confirm_your_password} Those_passwords_did_not_match_Try_again={dictionary.Register.Those_passwords_did_not_match_Try_again} 
            Use_8_characters_or_more_for_your_password={dictionary.Register.Use_8_characters_or_more_for_your_password} _isSemitic={_isSemitic} back={dictionary.Register.back}
            email={dictionary.Register.Email} next={dictionary.Register.Next} password={dictionary.Register.Password} reapeatPassword={dictionary.Register.Confirm} 
            Email_already_exists={dictionary.Register.Email_already_exists}/>      
        </>
    )
}
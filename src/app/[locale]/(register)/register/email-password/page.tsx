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
        
            <section className="commomSectionMenu flex items-start justify-center">
                <div className="flex items-center flex-col min-w-[200px]">
                    <h2 className="font-medium text-white text-[1.7em]">Register 2 parte</h2>
                    
                </div>
            </section>
            <section className="commomSectionMenu dataUser">
            
                <div className="dataUser_Container flex flex-col items-center justify-center gap-2 mb-[1.85em] ">
                   <RegisterEmailPassword locale={locale}/>
                </div>
            
            </section>
        </>
    )
}
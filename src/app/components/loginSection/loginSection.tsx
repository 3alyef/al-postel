"use client";
import { useState } from "react";
import DataUserFormEmail from "../dataUserFormEmail/dataUserFormEmail";
import { Locale } from "@/i18n";
import DataUserForm from "../dataUserForm/dataUserForm";
import { RingLoader } from "react-spinners";

interface PropsLoginSection {
    locale: Locale;
    _isSemitic: boolean;
    dictionary: any;
}
export default function LoginSection({_isSemitic, locale, dictionary}: PropsLoginSection) {
    const [passwordScreen, setPasswordScreen] = useState(false);
    const [emailValue, setEmailValue] = useState<string>('');
    const [loading, setLoading] = useState(false);
    return (
        <>
            {loading ? (
                <section className="commomSectionMenu">
                    <span className="flex ringLoaderToken" style={{justifyContent: "center", alignItems: "center"}}>
                        <RingLoader
                        color="#0034b9ad"
                        size={90}
                        />
                    </span>
                </section>
                
            ): passwordScreen ? (
                <section className="commomSectionMenu flex items-start justify-center">
                    <div className="flex items-center flex-col min-w-[200px]">
                        <h2 className="font-medium text-white text-[1.7em]">{dictionary.Login.Welcome}</h2>
                    
                    </div>
                </section>
            ): (
                <section className="commomSectionMenu">
                    <div className=" inline-flex items-center  min-h-[5em] px-[1.2em] gap-2 font-semibold ">
                        <div className="relative w-[2.85em] aspect-[1/1] pt-[.2em]">
                            <h2 className={`text-[2em] text-white`}>{dictionary.Login.Login}</h2>
                        </div>
                    </div>
                </section>
            )}
            
            <section className="commomSectionMenu dataUser">
                <div className="dataUser_Container">
                    {passwordScreen ? (
                        <div className="dataUser_Container flex flex-col items-center justify-center gap-2 ">
                            <DataUserForm Create_Account={dictionary.Login.Create_Account} Enter_your_password={dictionary.Login.Enter_your_password} Forgot_password={dictionary.Login.Forgot_password} Next={dictionary.Login.Next} _isSemitic={_isSemitic} locale={locale}
                            messageError={dictionary.Login.Incorrect_password} setPasswordScreen={setPasswordScreen} setLoading={setLoading}/>
                        </div>
                    ) : (
                        <DataUserFormEmail Create_Account={dictionary.Login.Create_Account} Email={dictionary.Login.Email} Forgot_your_email={dictionary.Login.Forgot_password} Next={dictionary.Login.Next} _isSemitic={_isSemitic} could_not_find_your_Al_PostEl_account={dictionary.Login.could_not_find_your_Al_PostEl_account} locale={locale} setPasswordScreen={setPasswordScreen} emailValue={emailValue} setEmailValue={setEmailValue} setLoading={setLoading}/>
                    )}
                    
                </div>
            </section>
        </>
    )
}
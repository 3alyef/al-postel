"use client";
import { Dispatch, SetStateAction, useState } from "react";
import InputText from "../inputText/inputText";
import { Locale } from "@/i18n";
import { verifyAll } from "@/services/toServerAndVerifyToken.service";
import Link from "next/link";

interface PropsFormRegister {
    locale: Locale;
    textLabelEmail: string;
    _isSemitic: boolean;
    forgotEmail: string;
    createAccount: string;
    next: string;
    could_not_find_your_Al_PostEl_account: string;
    onFocusStyle: boolean;
    setOnFocusStyle: Dispatch<SetStateAction<boolean>>;
    onFocusFunction: () => void;
    setPasswordScreen: Dispatch<SetStateAction<boolean>>;
    emailValue: string;
    setEmailValue: Dispatch<SetStateAction<string>>;
}

export default function FormEmailLogin({
    locale,
    textLabelEmail,
    _isSemitic,
    forgotEmail,
    createAccount,
    next,
    could_not_find_your_Al_PostEl_account,
    onFocusStyle,
    setOnFocusStyle,
    onFocusFunction,
    setPasswordScreen,
    emailValue,
    setEmailValue
}: PropsFormRegister) {
    const [processErrorStyle, setProcessErrorStyle] = useState<boolean>(false);

    const dataToLogin2 = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await verifyAll({ locale, emailValue, setProcessErrorStyle, isPassword: false, setPasswordScreen });
    };

    return (
        <form className="w-[100%]" onSubmit={dataToLogin2}>
            <div className="w-[85%] min-h-[68px]">
                <InputText
                    text={textLabelEmail}
                    _isSemitic={_isSemitic}
                    type="email"
                    costumerClass="text-white"
                    setValue={setEmailValue}
                    value={emailValue}
                    _isRequired={true}
                    processErrorStyle={processErrorStyle}
                    messageError={could_not_find_your_Al_PostEl_account}
                    onFocusFunction={onFocusFunction}
                    onFocusStyle={onFocusStyle}
                    setOnFocusStyle={setOnFocusStyle}
                />
            </div>
            <div className="forgetEmail">
                <div className="forgetEmailSubcontainer">
                    <input
                        type="button"
                        value={forgotEmail}
                        onClick={() => { /* future */ }}
                    />
                </div>
            </div>
            <div className="nextNewAccountMenu">
                <div className="btnNextAccount w-[65%]">
                    <Link href={`/${locale}/register`} className="flex items-center w-[80%]">
                        <div className="createAccount flex items-center justify-center">
                            {createAccount}
                        </div>
                    </Link>
                </div>
                <div className="btnNextAccount w-[40%]">
                    <input type="submit" value={next} className="nextBtnAccount" />
                </div>
            </div>
        </form>
    );
}

import { Locale } from "@/i18n";
import GuestButton from "../guestButton/guestButton";
import { Dispatch, SetStateAction } from "react";

interface PropsDefalutBackground {
    children: React.ReactNode;
    _isSemitic: boolean;
    locale: Locale;
    tests: boolean;
    setOnLinks?: Dispatch<SetStateAction<boolean>>;
    setLink1?: Dispatch<SetStateAction<string>>;
    setLink2?: Dispatch<SetStateAction<string>>;
    setLoading?: Dispatch<SetStateAction<boolean>>
}

export default function DefaultBackground({children, _isSemitic, locale, tests, setLink1, setLink2, setOnLinks, setLoading}: PropsDefalutBackground){

    return (
        <div className="main_Login ">
            <div className="barLogin">
                <div className={`container ${_isSemitic ? "semitic" : ""}`}>
                    <div className={`to2Container gap-[2px]`}>
                        {tests && setLink1 && setLink2 && setOnLinks && setLoading && <GuestButton locale={locale} setLink1={setLink1} setLink2={setLink2} setOnLinks={setOnLinks} setLoading={setLoading}/>}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
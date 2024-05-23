interface LanguagesFlagName {
    languageName: string;
    flag?: string;
    costumerClass?: string;
}


export default function LanguageFlagName({languageName, flag, costumerClass}: LanguagesFlagName){
    return(
        <>
            <div className={`languageFlag ${costumerClass}`}>
                <span className="languageName">
                    {languageName}
                </span>
                <span className="flag">
                    {flag}
                </span>
            </div>

        </>
    )
}
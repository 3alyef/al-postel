"use client";
import { useState } from "react";
import InputText from "../inputText/inputText";

interface propsSearchUser {
    _isSemitic: boolean
}

export function SearchUser({_isSemitic}: propsSearchUser) {
    const [onFocusSearchStyle, setOnFocusSearchStyle] = useState<boolean>(false);
    const [searchError, setSearchError] = useState<boolean>(false)
    const [searchFormValue, setSearchFormValue] = useState<string>("")
    function onFocusSearchFunc() {
        setOnFocusSearchStyle(true)
    }
    return(
        <div className="searchUserComponent">
            <div className="searchUserContainer">
                <div className="flex justify-center">
                    <div>
                        <InputText _isRequired={false} _isSemitic={_isSemitic} messageError="" onFocusFunction={onFocusSearchFunc} onFocusStyle={onFocusSearchStyle} processErrorStyle={searchError} setOnFocusStyle={setOnFocusSearchStyle} setValue={setSearchFormValue} text="Search" type="text" value={searchFormValue}  costumerClassDivContainer="costumerClassDivContainer"/>
                    </div>
                    <div className="btnSearchContainer">
                        <input className="searchBTN" type="button" value={"click"}/>
                    </div>
                </div>
                <div className="contactsDivSearch">

                </div>
            </div>
            
        </div>
    )
}

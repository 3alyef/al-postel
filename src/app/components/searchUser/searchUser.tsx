"use client";
import { useState } from "react";
import InputText from "../inputText/inputText";
import { ConnectM2 } from "@/services/connectToM2.service";
import { DataUser } from "@/interfaces/searchByEmail.interface";
import ContactSearchView from "../searchUserContactView/searchUserContactView";

interface propsSearchUser {
    _isSemitic: boolean;
    serverIo: ConnectM2;
}

export function SearchUser({_isSemitic, serverIo}: propsSearchUser) {
    const [onFocusSearchStyle, setOnFocusSearchStyle] = useState<boolean>(false);
    const [searchError, setSearchError] = useState<boolean>(false)
    const [searchEmailFormValue, setSearchEmailFormValue] = useState<string>("");
    const [searchResp, setSearchResp] = useState<DataUser>()
    /** 
     * {dataUser: {userSoul: null, userImageData: {lastUpdateIn: null, userImage: null}}}
    */

    function onFocusSearchFunc() {
        setOnFocusSearchStyle(true)
    }
    function searchUserFunc(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        serverIo.searchUser(searchEmailFormValue, setSearchResp)
        //console.log(searchEmailFormValue, searchResp)
    }

    
    return(
        <div className="searchUserComponent">
            <div className="searchUserContainer">
                <div className="flex justify-center">
                    <form onSubmit={searchUserFunc} className="flex">
                        <div>
                            <InputText _isRequired={false} _isSemitic={_isSemitic} messageError="" onFocusFunction={onFocusSearchFunc} onFocusStyle={onFocusSearchStyle} processErrorStyle={searchError} setOnFocusStyle={setOnFocusSearchStyle} setValue={setSearchEmailFormValue} text="Search" type="email" value={searchEmailFormValue}  costumerClassDivContainer="costumerClassDivContainer"/>
                        </div>
                        <div className="btnSearchContainer">
                            <input className="searchBTN" type="submit" value={"click"}/>
                        </div>
                    </form>
                </div>
                <div className="contactsDivSearch">
                    {
                        searchResp && (
                            <ContactSearchView email={searchEmailFormValue} sourceImage={searchResp.userImageData.userImage} user_name={"Test"}/>
                        )
                    }
                </div>
            </div>
            
        </div>
    )
}

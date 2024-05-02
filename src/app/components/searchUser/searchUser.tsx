"use client";
import { useEffect, useState } from "react";
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
    /*async function searchUserFunc(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const dataUser: DataUser = serverIo.searchUser(searchEmailFormValue)
        setSearchResp(dataUser)
        //console.log(searchEmailFormValue, searchResp)
    }*/

    useEffect(() => {
        async function fetchData() {
            if (searchEmailFormValue.includes("@") || searchEmailFormValue.length > 2) {
                try {
                    const dataUser = await serverIo.searchUser(searchEmailFormValue);
                    if(dataUser){
                        setSearchResp(dataUser);
                    }
                    
                } catch (error) {
                    console.error("Erro ao buscar usuário:", error);
                    // Trate o erro conforme necessário
                }
            }
        }
    
        fetchData();
        console.log('oi');
    
        // Lembre-se de adicionar todas as dependências usadas na função assíncrona para evitar problemas de atualização
    }, [searchEmailFormValue]);
    
    
    return(
        <div className="searchUserComponent">
            <div className="searchUserContainer">
                <div className="flex justify-center px-2">
                    
                       
                 
                        <InputText _isRequired={false} _isSemitic={_isSemitic} messageError="" onFocusFunction={onFocusSearchFunc} onFocusStyle={onFocusSearchStyle} processErrorStyle={searchError} setOnFocusStyle={setOnFocusSearchStyle} setValue={setSearchEmailFormValue} text="Search" type="text" value={searchEmailFormValue}  costumerClassDivContainer="costumerClassDivContainer"/>
               
                        
                        {/*
                            <div className="btnSearchContainer">
                                <input className="searchBTN" type="submit" value={"click"}/>
                            </div>
                        */}
                 
                </div>
                <div className="contactsDivSearch">
                    {
                        searchResp && searchResp.userImageData && (
                            <ContactSearchView email={searchResp.email} sourceImage={searchResp.userImageData.userImage} custom_name={searchResp.costumName.custom_name}/>
                        )
                    }
                </div>
            </div>
            
        </div>
    )
}

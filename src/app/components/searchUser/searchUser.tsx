"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InputText from "../inputText/inputText";
import { ConnectM2 } from "@/services/connectToM2.service";
import { DataUser } from "@/interfaces/searchByEmail.interface";
import ContactSearchView from "../searchUserContactView/searchUserContactView";
import { propsRoom } from "../alpostelMain/alpostelMain";

interface propsSearchUser {
    _isSemitic: boolean;
    serverIo: ConnectM2;
    updateRooms: Map<string, propsRoom[]>;
    setUpdateRooms: Dispatch<Map<string, propsRoom[]>>
}

export function SearchUser({_isSemitic, serverIo, updateRooms, setUpdateRooms}: propsSearchUser) {
    const [onFocusSearchStyle, setOnFocusSearchStyle] = useState<boolean>(false);
    const [searchError, setSearchError] = useState<boolean>(false)
    const [searchEmailFormValue, setSearchEmailFormValue] = useState<string>("");
    const [searchResp, setSearchResp] = useState<DataUser[]>([])
    /** 
     * {dataUser: {userSoul: null, userImageData: {lastUpdateIn: null, userImage: null}}}
    */

    function onFocusSearchFunc() {
        setOnFocusSearchStyle(true);
    }

    useEffect(() => {
        async function fetchData(repeat: boolean) {
            if(searchEmailFormValue.length > 5){
                try {
                    const dataUser = await serverIo.searchUser(searchEmailFormValue);
                    console.log(dataUser)
                    if (Array.isArray(dataUser)) {
                        console.log("entrou")
                        setSearchResp(dataUser);
                    } else {
                        if(dataUser === 'Usuário não encontrado na base de dados' && repeat){
                            return fetchData(false);
                        }
                    }
                    
                                     
                } catch (error) {
                    console.error("Erro ao buscar usuário:", error);
                    // Trate o erro conforme necessário
                }
            }
        }
    
        fetchData(true);
        //console.log('oi');
    
        // Lembre-se de adicionar todas as dependências usadas na função assíncrona para evitar problemas de atualização
    }, [searchEmailFormValue]);
    
    async function makeNetwork(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        console.log(e.currentTarget.dataset.soulValue);
        
        const userSoul = e.currentTarget.dataset.soulValue
        if(!userSoul) return
        try {       
            const content = await serverIo.makeNetwork(userSoul);
            console.log(content)
            /*if(content.includes("rukh")){
                 
                setUpdateRooms((prevRooms) => [...prevRooms, content]);  
                console.log("updateRooms", updateRooms) 
            }*/
                   
                        
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            // Trate o erro conforme necessário
        }
        
    }
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
                    {searchResp.length > 0 &&
                        searchResp.map((el, index) => (
                            <ContactSearchView
                                key={index}
                                email={el.email}
                                sourceImage={el.userImageData.userImage}
                                custom_name={el.costumName.custom_name}
                                first_name={el.first_name}
                                onClick={makeNetwork}
                                soulNameValue={el.userSoul ? el.userSoul : ''}
                            />
                        ))
                    }
                </div>
            </div>
            
        </div>
    )
}
/* */
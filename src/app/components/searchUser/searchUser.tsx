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
    setUpdateRooms: Dispatch<Map<string, propsRoom[]>>;
    showMessages: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, userSoul?:string, roomPropsC?:propsRoom) => Promise<void>;
    desactiveSearchUser: () => void;
    costumAlign?: string
}

export function SearchUser({_isSemitic, serverIo, updateRooms, setUpdateRooms, showMessages, desactiveSearchUser, costumAlign}: propsSearchUser) {
    const [onFocusSearchStyle, setOnFocusSearchStyle] = useState<boolean>(false);
    const [searchError, setSearchError] = useState<boolean>(false)
    const [searchFormValue, setSearchFormValue] = useState<string>("");
    const [searchResp, setSearchResp] = useState<DataUser[]>([])
    const [dataSearchFormChange, setDataSearchFormChange] = useState<boolean>(false)

    function onFocusSearchFunc() {
        setOnFocusSearchStyle(true);
    }

    useEffect(()=>{
        const timeOut = setTimeout(() => {
            setDataSearchFormChange(!dataSearchFormChange);
        }, 750);

        return ()=> clearTimeout(timeOut)
        
    }, [searchFormValue])

    useEffect(() => {
    
        async function fetchData(repeat2: boolean, repeat3: boolean) {
            if(searchFormValue.length > 5){
                try {
                    const dataUser = await serverIo.searchUser(searchFormValue);
                    console.log(dataUser)
                    if (Array.isArray(dataUser)) {
                        //console.log("entrou")
                        setSearchResp(dataUser);
                    } else {
                        const isDataUser = dataUser === 'Usuário não encontrado na base de dados'
                        if(isDataUser && repeat2 && !repeat3){
                            setTimeout(() => {
                               return fetchData(false, true); 
                            }, 2000);        
                        }

                        if(isDataUser && !repeat2 && repeat3){
                            setTimeout(() => {
                                return fetchData(false, false); 
                            }, 2000); 
                        }
                    }
                    
                                     
                } catch (error) {
                    console.error("Erro ao buscar usuário:", error);
                    // Trate o erro conforme necessário
                }
            }
        }
    
        fetchData(true, false);
        
    
        // Lembre-se de adicionar todas as dependências usadas na função assíncrona para evitar problemas de atualização
    }, [dataSearchFormChange]);
    
    async function makeNetwork(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        //console.log('userSoul', e.currentTarget.dataset.soulname);
        
        const userSoul = e.currentTarget.dataset.soulname
        if(!userSoul) return
        try { 
            const resp: {friendData: propsRoom} | string = await serverIo.makeNetwork(userSoul);
            
            if (typeof resp === 'object' && 'friendData' in resp) {
                showMessages(e, userSoul, resp.friendData); // Pass the correct property to showMessages
                desactiveSearchUser();
            }
            
        } catch (error) { 
            console.error("Erro ao buscar usuário:", error);
        }
         
    }
    return(
        <div className={`searchUserComponent ${costumAlign}`}>
            <div className="searchUserContainer">
                <div className="flex justify-center px-2">
                        <InputText _isRequired={false} _isSemitic={_isSemitic} messageError="" onFocusFunction={onFocusSearchFunc} onFocusStyle={onFocusSearchStyle} processErrorStyle={searchError} setOnFocusStyle={setOnFocusSearchStyle} setValue={setSearchFormValue} text="Search" type="text" value={searchFormValue}  costumerClassDivContainer="costumerClassDivContainer"/>
                 
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
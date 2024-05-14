"use client";
import { useEffect, useState } from "react";
import ContactsContainer from "../contactsContainer/contactsContainer";
import MsgsContainer from "../msgsContainer/msgsContainer";
import { ConnectM2 } from "@/services/connectToM2.service";
import { costumName } from "@/interfaces/searchByEmail.interface";
interface propsAlpostelMain {
    _isSemitic: boolean;
}
export interface propsRoom {
    first_name: string | undefined;
    last_name: string | undefined;
    userSoul: string;
    email: string | undefined;
    costumName: costumName;
    imageData: {userImage: string | undefined, lastUpdateIn: string | undefined}

}

export interface propsMessagesContent {
    _id?: string;
    fromUser: string;
    toUser: string;
    message: string;
    createdIn:  string
}
export function AlpostelMain({_isSemitic}:propsAlpostelMain) {
    const [serverIo, setServerIo] = useState<ConnectM2 | null>(null);
    const [updateRooms, setUpdateRooms] = useState<Map<string, propsRoom[]>>(new Map());
    const [userSoul, setUserSoul] = useState<string>('');
    const [screenMsg, setScreenMsg] = useState<Map<string, propsRoom>>(new Map());
    const [roomNameNow, setRoomNameNow] = useState<string>("")
    const [messagesContent, setMessagesContent] = useState<Map <string, propsMessagesContent[]>>(new Map())

    useEffect(() => {
        const tokenToM2 = localStorage.getItem("tokenToM2");
        const m2URL = localStorage.getItem("linkM2");
        
        if (tokenToM2 && m2URL) {
            const server = new ConnectM2(m2URL, tokenToM2);
            server.initialize(setUpdateRooms, setUserSoul, setMessagesContent);
            setServerIo(server);
            console.log('updateRooms', updateRooms)
        }
    }, []); // O array vazio garante que este efeito só será executado uma vez, semelhante ao componentDidMount

    useEffect(()=>{
        console.log('screenMsg', screenMsg)
    }, [screenMsg])
    return(
        <>
            { 
                serverIo && (
                    <>

                        <section className={`sectionContact ${roomNameNow.length > 0 ? 'sectionDisplayNone' : ''}`} style={{borderRadius: _isSemitic ? "0px 5px 5px 0px": "5px 0px 0px 5px"}}>
                            <ContactsContainer _isSemitic={_isSemitic} serverIo={serverIo} updateRooms={updateRooms} setUpdateRooms={setUpdateRooms} userSoul={userSoul} setScreenMsg={setScreenMsg} setRoomNameNow={setRoomNameNow}/>
                        </section>
                        
                        <section className={`sectionMsg ${!(roomNameNow.length > 0) ? 'sectionDisplayNone' : ''}`} style={{borderRadius: _isSemitic ? "5px 0px 0px 5px": "0px 5px 5px 0px"}}>
                            
                            <MsgsContainer screenMsg={screenMsg} messagesContent={messagesContent} _isSemitic={_isSemitic} serverIo={serverIo}
                            userSoul={userSoul} roomNameNow={roomNameNow} setMessagesContent={setMessagesContent} setRoomNameNow={setRoomNameNow}/>
                        </section>
                    </>
                )
            }
        </>
    )
}
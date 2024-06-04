"use client";
import { useEffect, useState } from "react";
import ContactsContainer from "../contactsContainer/contactsContainer";
import MsgsContainer from "../msgsContainer/msgsContainer";
import { ConnectM2, DecodedData } from "@/services/connectToM2.service";
import { costumName } from "@/interfaces/searchByEmail.interface";
import { propsGroups } from "@/interfaces/groups.interface";
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

export interface propsMessagesGroupContent {
    _id?: string;
    fromUser: string;
    deletedTo: "none" | Map<string, "justTo" | "justFrom" | "all">;
    viewStatus?: "onServer" | Map<string, "delivered" | "seen">;
    toUsers: string[];
    message: string;
    toGroup: string;
    createdIn:  string
}

export interface propsMessagesContent {
    _id?: string;
    fromUser: string;
    deletedTo: "none" | "justFrom" | "all";
    viewStatus?: "onServer" | "delivered" | "seen";
    toUser: string;
    message: string;
    createdIn:  string
}
export function AlpostelMain({_isSemitic}:propsAlpostelMain) {
    const [serverIo, setServerIo] = useState<ConnectM2 | null>(null);
    const [updateRooms, setUpdateRooms] = useState<Map<string, propsRoom[]>>(new Map());
    const [userSoul, setUserSoul] = useState<string>('');
    const [screenMsg, setScreenMsg] = useState<Map<string, propsRoom>>(new Map());
    const [screenMsgGroup, setScreenMsgGroup] = useState<Map<string, propsGroups>>(new Map())
    const [soulNameNow, setSoulNameNow] = useState<string>("")
    const [messagesContent, setMessagesContent] = useState<Map <string, propsMessagesContent[]>>(new Map())
    const [roomsListByUserSoul, setRoomsListByUserSoul] = useState<Map<string, string>>(new Map())
    const [typingStateRoom, setTypingStateRoom] = useState<Map<string, boolean>>(new Map);
    const [friendsOnline, setFriendsOnline] = useState<Map<string, boolean>>(new Map());
    const [userProps, setUserProps] = useState<DecodedData>();
    const [groupsDataById, setGroupsDataById] = useState<Map<string, propsGroups>>(new Map());
    const [isGroup, setIsGroup] = useState<boolean>(false);
    const [messageGroupContent, setMessagesGroupContent] = useState<Map<string, propsMessagesGroupContent[]>>(new Map())
    useEffect(() => {
        const tokenToM2 = localStorage.getItem("tokenToM2");
        const m2URL = localStorage.getItem("linkM2");
        
        if (tokenToM2 && m2URL) {
            const server = new ConnectM2(m2URL, tokenToM2, setMessagesContent, setMessagesGroupContent);
            server.initialize(setUpdateRooms, setUserSoul, setRoomsListByUserSoul, setTypingStateRoom, setFriendsOnline, setUserProps, setGroupsDataById);
            setServerIo(server);
            console.log('updateRooms', updateRooms)
        }
    }, []); 

    
    return(
        <>
            { 
                serverIo && (
                    <>

                        <section className={`sectionContact ${soulNameNow.length > 0 ? 'sectionDisplayNone' : ''}`} style={{borderRadius: _isSemitic ? "0px 5px 5px 0px": "5px 0px 0px 5px"}}>
                            <ContactsContainer _isSemitic={_isSemitic} serverIo={serverIo} updateRooms={updateRooms} setUpdateRooms={setUpdateRooms} userSoul={userSoul} setScreenMsg={setScreenMsg} setSoulNameNow={setSoulNameNow} userProps={userProps} messagesContent={messagesContent} groupsDataById={groupsDataById}
                            setScreenMsgGroup={setScreenMsgGroup} setIsGroup={setIsGroup}/>
                        </section>
                        
                        <section className={`sectionMsg ${!(soulNameNow.length > 0) ? 'sectionDisplayNone' : ''}`} style={{borderRadius: _isSemitic ? "5px 0px 0px 5px": "0px 5px 5px 0px"}}>
                            
                            <MsgsContainer screenMsg={screenMsg} messagesContent={messagesContent} _isSemitic={_isSemitic} serverIo={serverIo}
                            userSoul={userSoul} soulNameNow={soulNameNow} setMessagesContent={setMessagesContent} setSoulNameNow={setSoulNameNow} messageGroupContent={messageGroupContent}
                            setMessagesGroupContent={setMessagesGroupContent}
                            roomsListByUserSoul={roomsListByUserSoul} typingStateRoom={typingStateRoom} friendsOnline={friendsOnline}
                            screenMsgGroup={screenMsgGroup} isGroup={isGroup}/>
                        </section>
                    </>
                )
            }
        </>
    )
}
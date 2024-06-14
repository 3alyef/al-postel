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
    deletedTo: "none" | "justTo" | "justFrom" | "all";
    viewStatus?: "onServer" | Map<string, "delivered" | "seen">;
    toUsers: string[];
    message: string;
    toGroup: string;
    createdIn:  string
}
export interface propsMessagesGroupContentFromServer {
    _id?: string;
    fromUser: string;
    deletedTo: "none" | "justTo" | "justFrom" | "all";
    viewStatus?: string;
    toUsers: string[];
    message: string;
    toGroup: string;
    createdIn:  string
}

export interface propsMessagesContent {
    _id?: string;
    fromUser: string;
    deletedTo: "none" | "justTo" | "justFrom" | "all";
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
    const [messageGroupContent, setMessagesGroupContent] = useState<Map<string, propsMessagesGroupContent[]>>(new Map());
    const [participantsBgColor, setParticipantsBgColor] = useState<Map<string, Map<string, string>>>(new Map());

    const [participantsData, setParticipantsData] = useState<Map<string, propsRoom>>(new Map ());
    function generateRandomColor() {
        const baseColor = [160, 180, 151]; // RGB for #a0b497
        const variation = 30; // Adjust this value for more or less variation
    
        const randomChannel = (base: number) => {
            const randomOffset = Math.floor(Math.random() * variation - variation / 2);
            const newChannel = base + randomOffset;
            return Math.max(0, Math.min(255, newChannel)).toString(16).padStart(2, '0');
        };
    
        const red = randomChannel(baseColor[0]);
        const green = randomChannel(baseColor[1]);
        const blue = randomChannel(baseColor[2]);
    
        return `#${red}${green}${blue}`;
    };
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

    useEffect(()=>{
        
        setParticipantsBgColor((previous)=>{
            let newV: Map<string, Map<string, string>> = new Map(previous)
            groupsDataById.forEach((value, groupName)=>{
                let group = newV.get(groupName)
                if(!group){
                    group= new Map();
                    newV.set(groupName, group)
                }
                value.groupParticipants.forEach((participant)=>{
                    if (participant !== userSoul && !group.has(participant)) {
                        let randomColor;
                        let colorExists;
                        do {
                            randomColor = generateRandomColor();
                            colorExists = Array.from(group.values()).includes(randomColor);
                        } while (colorExists);
                        group.set(participant, randomColor);
                    }
                })
                
            })
            return newV
        })

        setParticipantsData((previous)=>{
            const newValue:Map<string, propsRoom> = new Map(previous);
            groupsDataById.forEach((value)=>{
                const participants = value.groupParticipants.filter(participant => participant !== userSoul);
                const newParticipants = participants.filter(participant => !newValue.has(participant));
                newParticipants.forEach( async (participant) => {
                    const participantProps = updateRooms.get(participant);
                    if (participantProps) {
                        newValue.set(participant, participantProps[0]);
                    } else {
                        let dataUser = await serverIo?.getDataUser(participant)
                        if(dataUser && "dataUser" in dataUser){
                            newValue.set(participant, dataUser.dataUser);
                        }
                    }
                });
            })

            return newValue;
        })
    }, [groupsDataById, updateRooms]);

    useEffect(()=>{
        //console.log("participantsBgColor", participantsBgColor)
        console.log('participantsData', participantsData)
    }, [/*participantsBgColor*/ participantsData])
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
                            screenMsgGroup={screenMsgGroup} isGroup={isGroup}
                            participantsBgColor={participantsBgColor}
                            groupsDataById={groupsDataById} updateRooms={updateRooms}
                            participantsData={participantsData}/>
                        </section>
                    </>
                )
            }
        </>
    )
}
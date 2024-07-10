"use client";
import { ConnectM2, DeletedToType } from "@/services/connectToM2.service";
import { propsMessagesGroupContent, propsRoom } from "../alpostelMain/alpostelMain";
import MessageLabelGroup from "../messageLabelGroup/messageLabelGroup";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface propsGroupMsgs {
    messagesContainerByGroup: propsMessagesGroupContent[];
    soulNameNow: string;
    userSoul: string;
    serverIo: ConnectM2;
    roomsListByUserSoul: Map<string, string>;
    setMessagesGroupContent: Dispatch<SetStateAction<Map<string, propsMessagesGroupContent[]>>>;
    participantsBgColor: Map<string, Map<string, string>>;
    participantsData: Map<string, propsRoom>;
    setMsgCreatedInDelete: Dispatch<SetStateAction<string[]>>;
    msgCreatedInDelete: string[]
}
export default function GroupMsgs({messagesContainerByGroup, soulNameNow, userSoul, serverIo, roomsListByUserSoul, setMessagesGroupContent, msgCreatedInDelete, participantsBgColor, participantsData, setMsgCreatedInDelete}: propsGroupMsgs) {
    /*const [deletedTo, setDeletedTo] = useState<DeletedToType>("none")
    useEffect(()=>{
        setDeletedTo()
    }, [messagesContainerByGroup])*/
    return (
        <>
            {
                messagesContainerByGroup.map((msg) => {
                    const createdDate = new Date(msg.createdIn);
                    const createdTime = createdDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                    
                    const deletedToMap = stringToMap<string, DeletedToType>(msg.deletedTo);
                    let deletedTo: DeletedToType = "none";
                    
                    if(msg.fromUser === userSoul){
                        deletedToMap.forEach((del) => {
                            if (del === "all" || del === "allTo") {
                                deletedTo = "all";
                            } else if (del === "justTo" || del === "none") {
                                deletedTo = "none"
                            } else if (del === "allFrom" || del === "justFrom") {
                                deletedTo = "allFrom";
                            } else if(del === "justAll") {
                                deletedTo = "justAll"
                            }
                        });

                    } else {
                        const deletedToValue = deletedToMap.get(userSoul);
                        if(deletedToValue){
                            deletedTo = deletedToValue;
                        }
                    }
                    
                    return (
                        <MessageLabelGroup
                        groupAdress={soulNameNow} 
                        createdTime={createdTime} 
                        messageGroup={msg}
                        userSoul={userSoul} 
                        serverIo={serverIo}
                        roomsListByUserSoul={roomsListByUserSoul} key={msg.createdIn}
                        setMessagesGroupContent={setMessagesGroupContent}
                        participantsBgColor={participantsBgColor}
                        groupName={soulNameNow} 
                        participantsData={participantsData}
                        setMsgCreatedInDelete={setMsgCreatedInDelete}
                        msgCreatedInDelete={msgCreatedInDelete} deletedToMSG={deletedTo}/>
                    )
                })
            }
        </>
    )
}

interface PropsDeleteMsgsGroup {
    room: string;
    deletedTo: DeletedToType;
    msgCreatedInDelete: string[];
    messagesContainerByGroup: propsMessagesGroupContent[];
    serverIo: ConnectM2;
    userSoul: string;
}   

export async function deleteMsgsGroup({ deletedTo, messagesContainerByGroup, msgCreatedInDelete, serverIo, room, userSoul }: PropsDeleteMsgsGroup) {
    console.log("deletedTo", deletedTo)
    if(deletedTo === "all"){
        for (const crdIn of msgCreatedInDelete){
            const msg = messagesContainerByGroup.find(msg => msg.createdIn === crdIn);
            if(msg){
                let deletedTo = transformDeletedToGroup(msg.deletedTo, "all", userSoul, msg.fromUser);
                let resp = await serverIo.deleteGroupMsg({createdIn: msg.createdIn, deletedTo, fromUser: msg.fromUser, room, toUsers: msg.toUsers });

                console.log("resp", resp);
            }
        }
    } else {
        const toMsgs = messagesContainerByGroup.filter(msg => msgCreatedInDelete.includes(msg.createdIn) && msg.fromUser !== userSoul); // as msgs que não vieram do user
        let toCreatedIn = toMsgs.map(msg => msg.createdIn);

        for (const crdIn of toCreatedIn){
            //console.log("of", crdIn)
            const msg = messagesContainerByGroup.find(msg => msg.createdIn === crdIn);
            if(msg) {
                let resp = await serverIo.deleteGroupMsg({createdIn: crdIn, deletedTo: transformDeletedToGroup(msg.deletedTo, "justTo", userSoul, msg.fromUser), room, fromUser: msg.fromUser , toUsers: msg.toUsers});

                console.log("resp", resp);
            }
        }

        let fromCreatedIn: string[] = msgCreatedInDelete.filter(crdIn => !toCreatedIn.includes(crdIn));
            
        for (const crdIn of fromCreatedIn) {
            const msg = messagesContainerByGroup.find(msg => msg.createdIn === crdIn);
            if (msg) {
                let resp = await serverIo.deleteGroupMsg({createdIn: crdIn, deletedTo: transformDeletedToGroup(msg.deletedTo, deletedTo, userSoul, msg.fromUser), room, fromUser: msg.fromUser , toUsers: msg.toUsers});

                console.log("resp", resp);
            }
        }
    }

    return;
}

function transformDeletedToGroup(previousDeletedTo: string, newValue: DeletedToType, userSoul: string, fromUser: string): string {
    let mapDeletedTo = stringToMap<string, DeletedToType>(previousDeletedTo);
    mapDeletedTo.forEach((value, key)=>{
        if(key === userSoul || userSoul === fromUser) {
            mapDeletedTo.set(key, changeDeletedTo(value, newValue));
        }
    })
    return mapToString<string, DeletedToType>(mapDeletedTo);
}

// Converte Map ==> String_Map:
export function mapToString<K, V>(map: Map<K, V>): string{
    return JSON.stringify(Array.from(map.entries()));
}

// Converte String_Map ==> Map:
export function stringToMap<K, V>(str: string): Map<K, V> {
    const parsedEntries: [K, V][] = JSON.parse(str);
    return new Map<K, V>(parsedEntries);
}

//
export function changeDeletedTo(previous: DeletedToType, current: DeletedToType): DeletedToType {
    let newValue: DeletedToType = "none";
    console.log("previous", previous);
    console.log("current", current);
    
    if(previous === "none"){
        newValue = current;
    } else if(previous === "all"){
        if(current === "justFrom"){
            newValue = "allFrom"
        } else {
            newValue = "allTo";
        }
    } else if(previous === "allFrom" || previous === "allTo"){
        newValue = "justAll"
    } else if(previous === "justFrom"){
        if(current === "justTo"){
            newValue = "justAll";
        }
    } else if(previous === "justTo"){
        if(current === "justFrom"){
            newValue = "justAll";
        } else if(current === "all"){
            newValue = "allTo";
        }
    } 

    return newValue;
}

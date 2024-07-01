import { ConnectM2 } from "@/services/connectToM2.service";
import { propsMessagesGroupContent, propsRoom } from "../alpostelMain/alpostelMain";
import MessageLabelGroup from "../messageLabelGroup/messageLabelGroup";
import { Dispatch, SetStateAction } from "react";

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
    return (
        <>
            {
                messagesContainerByGroup.map((msg) => {
                    const createdDate = new Date(msg.createdIn);
                    const createdTime = createdDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                    
                    return (
                        <MessageLabelGroup
                        soulName={soulNameNow} createdTime={createdTime} messageGroup={msg}
                        userSoul={userSoul} serverIo={serverIo}
                        roomsListByUserSoul={roomsListByUserSoul} key={msg.createdIn}
                        setMessagesGroupContent={setMessagesGroupContent}
                        participantsBgColor={participantsBgColor}
                        groupName={soulNameNow} 
                        participantsData={participantsData}
                        setMsgCreatedInDelete={setMsgCreatedInDelete}
                        createdIn={msg.createdIn}
                        msgCreatedInDelete={msgCreatedInDelete} deletedTo={msg.deletedTo}
                        fromUser={msg.fromUser}
                        toUsers={msg.toUsers}/>
                    )
                })
            }
        </>
    )
}

interface PropsDeleteMsgsGroup {
    room: string;
    deletedTo: "none" | "justTo" | "justAll" | "justFrom" | "all" | "allFrom" | "allTo";
    msgCreatedInDelete: string[];
    messagesContainerByGroup: propsMessagesGroupContent[];
    serverIo: ConnectM2;
    userSoul: string;
}   

export async function deleteMsgsGroup({ deletedTo, messagesContainerByGroup, msgCreatedInDelete, serverIo, room, userSoul }: PropsDeleteMsgsGroup) {

    let msgsGroup: propsMessagesGroupContent[] | undefined = messagesContainerByGroup.filter(msg => msgCreatedInDelete.includes(msg.createdIn));
    let fromUser: string;
    let toUsers: string[];
    
    if(msgsGroup.length > 0){
        for(const msg of msgsGroup){
            fromUser = msg.fromUser;
            toUsers = msg.toUsers;

            if(deletedTo === "all"){
                await serverIo.deleteGroupMsg({createdIn: msg.createdIn, deletedTo: "all", fromUser, room, toUsers});
            } else if(deletedTo === "justFrom"){
                let newDeletedTo: "none" | "justFrom" | "all" | "allFrom" | string;
                if(fromUser === userSoul){
                    if(msg.deletedTo === "none") {
                        newDeletedTo = "justFrom";
                    } else if(msg.deletedTo === "justFrom") {

                    } else if(msg.deletedTo === "all") {
                        
                    } else if(msg.deletedTo === "allFrom") {
                        
                    }
                } else if(toUsers.includes(userSoul)){
                    if(msg.deletedTo === "none") {
                        newDeletedTo = "justTo";
                    } else if(msg.deletedTo === "justFrom") {

                    } else if(msg.deletedTo === "all") {

                    }  else if(msg.deletedTo === "allFrom") {
                        
                    }
                }

            }
            
        }
    }
    
}
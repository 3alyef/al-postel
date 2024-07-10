"use client";

import { useEffect, useState } from "react";
import { MsgLabelGroup } from "./msgLabelGroup.interface";
import { DeletedToType } from '../../../services/connectToM2.service';
import MessageLayout from "./messageLayout";

export default function MessageLabelGroup({messageGroup, groupAdress, createdTime, userSoul, serverIo,setMessagesGroupContent, roomsListByUserSoul, participantsBgColor, groupName, participantsData, setMsgCreatedInDelete, msgCreatedInDelete, deletedToMSG}: MsgLabelGroup){
    const [deletedTo, setDeletedTo] = useState<DeletedToType>(deletedToMSG);
    useEffect(()=>{
        console.log("alteração deletedToMSG", deletedToMSG)
        setDeletedTo(deletedToMSG);
    }, [deletedToMSG])
    if(
    deletedTo === "none" 
    || deletedTo === "all" 
    || (deletedTo === "allFrom" && messageGroup.fromUser !== userSoul) 
    || (deletedTo === "justFrom" && messageGroup.fromUser !== userSoul)
    ){
        return (
            <MessageLayout
            createdIn={messageGroup.createdIn}
            createdTime={createdTime}
            deletedTo={deletedTo}
            fromUser={messageGroup.fromUser}
            groupAdress={groupName}
            message={messageGroup.message}
            msgCreatedInDelete={msgCreatedInDelete}
            participantsBgColor={participantsBgColor}
            participantsData={participantsData}
            setMsgCreatedInDelete={setMsgCreatedInDelete}
            userSoul={userSoul}
            />
        )
    }
}



/*
    
    //const [viewStatus, setViewStatus] = useState();
    useEffect(()=>{
        viewStatusGroup.generateViewStatus({viewStatus: messageGroup.viewStatus, setMessagesGroupContent, userSoul, fromUser, room: soulName, serverIo: serverIo, createdIn, toUsers});
        
    }, [messageGroup, soulName, serverIo, userSoul]);

   
   ------>>>>> useEffect(()=>{
        console.log("prev", deletedTo, "deletedToMSG change", deletedToMSG)
        setDeletedTo(deletedToMSG);
    }, [deletedToMSG]);
    
    
    
    

   

    

    
    
    

   
    
    
}*/
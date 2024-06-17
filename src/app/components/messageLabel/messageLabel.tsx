"use client";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import { propsMessagesContent, propsMessagesGroupContent, propsRoom } from "../alpostelMain/alpostelMain";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ConnectM2 } from "@/services/connectToM2.service";
import useLongPress from "@/hooks/useLongPress.hook";
import { RiForbid2Line } from "react-icons/ri";

interface propsMessageLabel {
    message?: propsMessagesContent;
    messageGroup?: propsMessagesGroupContent;
    soulName: string;
    createdTime: string;
    userSoul: string;
    serverIo: ConnectM2;
    setMessagesContent: Dispatch<SetStateAction<Map<string, propsMessagesContent[]>>>;
    setMessagesGroupsContent: Dispatch<SetStateAction<Map<string, propsMessagesGroupContent[]>>>
    roomsListByUserSoul: Map<string, string>;
    participantsBgColor: Map<string, Map<string, string>>;
    groupName?:string;
    participantsData: Map<string, propsRoom>;
    setMsgCreatedInDelete: Dispatch<SetStateAction<string[]>>;
    createdIn: string;
    msgCreatedInDelete: string[];
    deletedTo: "none" | "justTo" | "justAll" | "justFrom" | "all" | "allFrom" | "allTo";
    fromUser: string;
    isGroup: boolean;
    toUsers?: string[] 
}

export default function MessageLabel({message, messageGroup, soulName, createdTime, userSoul, serverIo, setMessagesContent, setMessagesGroupsContent, roomsListByUserSoul, participantsBgColor, groupName, participantsData, setMsgCreatedInDelete, msgCreatedInDelete, createdIn, deletedTo, fromUser, isGroup, toUsers}: propsMessageLabel){
    const [selectArea, setSelectArea] = useState<boolean>(false)
    //
    
    const longPressEvent = useLongPress({
        onLongPress: ()=>{
            //setDeleteMsgScreen(!deleteMsgScreen);
            if(selectArea) {
                //console.log('ja esta')
                setMsgCreatedInDelete(
                    (prev)=>{
                        const newV = prev.filter(created => created !== createdIn);
                        return newV;
                    }
                )
            } else {
                //console.log('nao esta')
                setMsgCreatedInDelete(prev => [...prev, createdIn])
            }
            
            //funcDeleteMsgScreen();
            setSelectArea(!selectArea);
        },
        onClick: ()=>{            
            if(selectArea && msgCreatedInDelete.length > 0 && !msgCreatedInDelete.includes(createdIn)){
                setMsgCreatedInDelete(prev => [...prev, createdIn])
                setSelectArea(true);
            }
        },
        ms: 500, // 500ms for long press detection
    });

    ///
    const [bgColor, setBgColor] = useState<string>('');
    const [dataUser, setDataUser] = useState<propsRoom>();
    useEffect(()=>{
        console.log()
        if(messageGroup && messageGroup.fromUser){
            setDataUser(()=>{
                let data = participantsData.get(messageGroup.fromUser);
                return data
            })
        }
    },[participantsData])
    useEffect(()=>{
        if(messageGroup && messageGroup.message && groupName){
            let group = participantsBgColor.get(groupName);
            if(group){
                let bgC = group.get(messageGroup.fromUser);
                if(bgC){
                    setBgColor(bgC)
                }
               
            }
        }
    }, [participantsBgColor])

    function typeOfCheck(viewStatus: "onServer" | "delivered" | "seen"){
        if(viewStatus === 'onServer'){
            return<span className="text-[1.25em]"> <BsCheck /></span>
        }
        if(viewStatus === 'delivered') {
            return <span className="text-[1.25em]"><BsCheckAll/></span>
        }
        if(viewStatus === 'seen'){
            return <span className="text-[1.25em] text-[#0c5dba]"><BsCheckAll/></span>
        }
    }

    useEffect(()=>{
        
        if(message && message.viewStatus && !(message.viewStatus === "seen") && message.fromUser !== userSoul){

            const room = roomsListByUserSoul.get(soulName)
            if(room){
                serverIo.msgSeenUpdate({fromUser: message.fromUser, toUser: message.toUser, createdIn: message.createdIn, room, viewStatus: 'seen'})
            
                setMessagesContent((previous) => {
                    const newMessages: Map <string, propsMessagesContent[]> = new Map<string, propsMessagesContent[]>(previous);
                    newMessages.forEach((value, key)=>{
                        if(key === message.fromUser){
                            const updatedMessages: propsMessagesContent[] = value.map((msg) => {
                                if (msg.createdIn === message.createdIn) {
                                    return { ...msg, viewStatus: 'seen' };
                                }
                                return msg;
                            });
            
                            newMessages.set(key, updatedMessages);
                        }
                    })
                    return newMessages
                });
            }
            
        }
        /*if(messageGroup && messageGroup.viewStatus && messageGroup.viewStatus !== "onServer"){
            /*const haveSeen = messageGroup.viewStatus.
            if(){}
            
        }*/
    
        if(messageGroup){
            console.log('messageGroup', messageGroup)
        }
        
    }, [message, messageGroup, soulName, serverIo, setMessagesContent, setMessagesGroupsContent, userSoul]);

    /*useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            //  !target.closest('.messageRenderContainer')
            // && target.className !== "divDeleteML" && target.className !== "messageRender" && target.closes
            if (msgCreatedInDelete.length > 0 && !target.closest('.messageRenderContainer')) {
                setSelectArea(false);
                setMsgCreatedInDelete([]);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [selectArea]);*/
    function divDeleteML(){
        setMsgCreatedInDelete(
            (prev)=>{
                const newV = prev.filter(created => created !== createdIn);
                return newV;
            }
        )
        setSelectArea(false);
    }
    useEffect(()=>{
        if(!msgCreatedInDelete.includes(createdIn)){
            setSelectArea(false);
        }
    }, [msgCreatedInDelete])
    
    /**!(deletedTo === "justAll") && !(deletedTo === "justFrom" && fromUser === userSoul) && !(deletedTo === "justTo" && fromUser === soulName) && !(deletedTo === "allFrom" && fromUser === userSoul) && !(deletedTo === "allTo" && fromUser === soulName)) */
    const data = () => (
        <div className='messageRenderContainer' data-createdin={createdIn} onClick={()=>{
            if(msgCreatedInDelete.length > 0 && !msgCreatedInDelete.includes(createdIn)){
                setMsgCreatedInDelete(prev => [...prev, createdIn])
                setSelectArea(true);
            }
        }}>
            <div className={`messageRender min-w-[25%] 
            ${(message && message.fromUser === userSoul || messageGroup && messageGroup.fromUser === userSoul) ? "messageRenderBgSender" : "messageRenderBgReceive self-end"}`}
            {...longPressEvent}
            >
                {
                    messageGroup && messageGroup.fromUser !== userSoul  && messageGroup.message && (
                        <>
                            <div className="text-white font-normal w-[100%] flex justify-between gap-[.75em] px-[.3em]">
                                <p className="ltr font-semibold"
                                style={(bgColor && messageGroup && messageGroup.message) ? {
                                    color: bgColor,
                                    textShadow: "0px 0px 20px black"
                                } : undefined}
                                >
                                    ~ {dataUser && dataUser.first_name}
                                </p>
                                <p>
                                    {dataUser && dataUser.email}
                                </p>
                            </div>
                        </>
                    )
                }
                
                <p className="msgContainer ltr">
                    {
                        (
                            !(deletedTo === "all") && !(deletedTo === "allTo" && fromUser === soulName)
                            && !(deletedTo === "allTo" || deletedTo === "allFrom")
                        )
                        ? 
                        (message && message.message || messageGroup && messageGroup.message) 
                        : 
                        (<span className="flex items-center gap-1" 
                        style={fromUser === userSoul? {color: "#090909d4"} : {color: "rgb(239 239 239 / 75%)"}}>
                            Mensagem Apagada <RiForbid2Line/>
                        </span>)
                    }
                </p>
                
                <p className="msgCreatedIn flex justify-between w-full">{createdTime}
                
                {
                    !(deletedTo === "all") && !(deletedTo === "allTo" && fromUser === soulName)
                    && !(deletedTo === "allTo" || deletedTo === "allFrom") && 
                    
                    message && message.viewStatus && message.fromUser === userSoul && typeOfCheck(message.viewStatus)
                }
                </p>
            </div>
            <div className="divDeleteML" style={!selectArea ? {display: "none"} : undefined}
            onClick={divDeleteML}>

            </div>
        </div>
    )

    
    if(isGroup && toUsers){
        if(!(deletedTo === "justAll") && !(deletedTo === "justFrom" && fromUser === userSoul) && !(deletedTo === "justTo" && toUsers.includes(fromUser)) && !(deletedTo === "allFrom" && fromUser === userSoul) && !(deletedTo === "allTo" && toUsers.includes(fromUser))){
            return data();
        }
    } else if(!isGroup){
        if(!(deletedTo === "justAll") && !(deletedTo === "justFrom" && fromUser === userSoul) && !(deletedTo === "justTo" && fromUser === soulName) && !(deletedTo === "allFrom" && fromUser === userSoul) && !(deletedTo === "allTo" && fromUser === soulName)){
            return data();
        }
    }
    
}
"use client";

import { propsRoom } from "@/app/components/alpostelMain/alpostelMain";
import EmojisList from "@/app/components/emojisList/emojisList";
import TextareaMsg from "@/app/components/textareaMsg/textareaMsg";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { ConnectM2, DeletedToType, sendMsg, sendMsgGroup } from "@/services/connectToM2.service";
import { propsGroups } from "@/interfaces/groups.interface";
import { ViewStatusMapSub } from "@/services/ViewStatus_group.service";
import { mapToString } from "@/app/components/groupMsgs/groupMsgs";
interface PropsFooterMsgShow {
    _isSemitic: boolean;
    screenProps: propsRoom | undefined;
    isGroup: boolean;
    roomsListByUserSoul: Map<string, string>;
    soulNameNow: string;
    userSoul: string;
    serverIo: ConnectM2;
    groupsScreenProps: propsGroups | undefined;
}
export default function FooterMsgShow({_isSemitic, screenProps, isGroup, roomsListByUserSoul, soulNameNow, userSoul, serverIo, groupsScreenProps}: PropsFooterMsgShow) {
    const [onFocusStyle, setOnFocusStyle] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>("");
    const [isTyping, setIsTyping] = useState<boolean>(false);
    function onFocus() {
        setOnFocusStyle(true);
    }
    function onBlur(){
        setOnFocusStyle(false);
        setIsTyping(false);
    }
    function sendMsg(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        //console.log(msg, "/*/*/*/", groupsScreenProps)
        if(msg.length > 0 ) {
            const dateInf = new Date(); 
            const createdIn = dateInf.toISOString();
            
            if(screenProps?.userSoul && !isGroup){
                const roomNameNow = roomsListByUserSoul.get(soulNameNow);
                const msgS: sendMsg = {fromUser: userSoul, deletedTo: "none", message: msg, toUser: screenProps.userSoul, createdIn, toRoom: roomNameNow};
                //console.log("msgS",msgS);
                serverIo.sendMsg(false, msgS);
            } 
            if (groupsScreenProps?.userSoul && isGroup) {
                let toUsers = groupsScreenProps.groupParticipants;
                let deletedTo: Map<string, DeletedToType> = new Map();
                let viewStatus: Map<string, ViewStatusMapSub> = new Map();
                for(const user of toUsers){
                    deletedTo.set(user, "none");
                    viewStatus.set(user, "none");
                }
                const msgS: sendMsgGroup = {
                    createdIn,
                    deletedTo: mapToString(deletedTo),
                    fromUser: userSoul,
                    message: msg,
                    toGroup: soulNameNow,
                    toUsers,
                    viewStatus: mapToString(viewStatus)
                };
                //console.log('msgS Group: ', msgS)
                serverIo.sendMsg(true, undefined, msgS);
            }
            setMsg('');
            setIsTyping(false);
        }
    }
    useEffect(()=>{
        if(!isTyping && msg.length > 0){
            setIsTyping(true)
        }
    }, [msg])
    useEffect(()=>{
        //console.log('isTyping', isTyping);
        serverIo.setTypingState({state: isTyping, userSoulFrom: userSoul, userSoulTo: soulNameNow});
    }, [isTyping])
    return (
        <div className=" footerBarMsgs">
            <form onSubmit={sendMsg} className="footerBarContacts formFooterBar flex w-[57%] items-center justify-between py-2">
                <EmojisList/>
                <div className="messageInput">
                    <TextareaMsg value={msg} setValue={setMsg} _isRequired={true} _isSemitic={_isSemitic} messageError="" onFocusFunction={onFocus} onFocusStyle={onFocusStyle} processErrorStyle={false} setOnFocusStyle={setOnFocusStyle} text="Mensagem" costumerClass="text-white" onBlur={onBlur}/>
                </div>  
                <button className="sendMsg flex items-center justify-center" type="submit">
                    <IoMdSend className="text-white w-[75%] h-[75%]"
                    style={{rotate: _isSemitic ? '180deg':'0deg'}}/>
                </button>
            </form>
                
        </div>
    )
}
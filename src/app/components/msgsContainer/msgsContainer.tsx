"use client"

import { desactiveScreens } from "@/services/desactiveScreens.service";
import { useEffect, useState, SetStateAction, Dispatch, useRef } from 'react';
import Image from "next/image";
import { propsMessagesContent, propsMessagesGroupContent, propsRoom } from "../alpostelMain/alpostelMain";
import { IoMdSend } from "react-icons/io";
import { ConnectM2, sendMsgGroup } from "@/services/connectToM2.service";
import { sendMsg } from "@/services/connectToM2.service";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import MessageLabel from "../messageLabel/messageLabel";
import TextareaMsg from "../textareaMsg/textareaMsg";
import OptionsSwitch from "../optionsSwitch/optionsSwitch";
import EmojisList from "../emojisList/emojisList";
import { propsGroups } from "@/interfaces/groups.interface";

interface propsMsgContainer {
    screenMsg: Map<string, propsRoom>;
    messagesContent: Map<string, propsMessagesContent[]>;
    setMessagesContent: Dispatch<SetStateAction<Map <string, propsMessagesContent[]>>>;
    _isSemitic: boolean;
    serverIo: ConnectM2;
    userSoul: string;
    soulNameNow: string;
    setSoulNameNow: Dispatch<SetStateAction<string>>;
    roomsListByUserSoul: Map<string, string>;
    typingStateRoom: Map<string, boolean>;
    friendsOnline: Map<string, boolean>;
    screenMsgGroup: Map<string, propsGroups>;
    isGroup: boolean;
    messageGroupContent: Map<string, propsMessagesGroupContent[]>;
    setMessagesGroupContent: Dispatch<SetStateAction<Map<string, propsMessagesGroupContent[]>>>
}
export default function MsgsContainer({screenMsg, messagesContent, _isSemitic, serverIo, userSoul, soulNameNow, setMessagesContent, setSoulNameNow, roomsListByUserSoul, typingStateRoom, friendsOnline, isGroup, screenMsgGroup, messageGroupContent, setMessagesGroupContent}: propsMsgContainer){
    const [onProfile, setOnProfile] = useState<boolean>(false);
    const [screenProps, setScreenProps] = useState<propsRoom>();
    const [groupsScreenProps, setGroupsScreenProps] = useState<propsGroups>();
    const [menu, setMenu] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>("");
    const [messagesContainerByRoom, setMessagesContainerByRoom] = useState<propsMessagesContent[]>([]);
    const [messagesContainerByGroup, setMessagesContainerByGroup] = useState<propsMessagesGroupContent[]>([])
    const [isTyping, setIsTyping] = useState<boolean>(false)
    const [friendIsTyping, setFriendIsTyping] = useState<boolean>(false)
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isOnlineFriend, setIsOnlineFriend] = useState<boolean>(false)
    const [onFocusStyle, setOnFocusStyle] = useState<boolean>(false);
    useEffect(()=>{
        if(isGroup){
            const msgArray = Array.from(screenMsgGroup.values());
            setGroupsScreenProps(msgArray[0]);
            console.log("msgArray", msgArray);
        } else {
            const msgArray = Array.from(screenMsg.values());
            setScreenProps(msgArray[0]);
            console.log("msgArray", msgArray);
        }
        
       
    }, [screenMsgGroup, screenMsg, isGroup]);

    
    const onFocus = ()=>{
        setOnFocusStyle(true);
        
    }

    function sendMsg(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        console.log(msg, "/*/*/*/", groupsScreenProps)
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
                const msgS: sendMsgGroup = {
                    createdIn,
                    deletedTo: "none",
                    fromUser: userSoul,
                    message: msg,
                    toGroup: soulNameNow,
                    toUsers: groupsScreenProps.groupParticipants,
                    viewStatus: undefined
                };
                console.log('msgS Group: ', msgS)
                serverIo.sendMsg(true, undefined, msgS);
            }
            setMsg('');
            setIsTyping(false);
        }
    }

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };
    useEffect(()=>{
        scrollToBottom();
        const friendStatus = friendsOnline.get(soulNameNow)
        //console.log('friendsOnline', friendsOnline)
        if(typeof friendStatus === 'boolean') {
            
            setIsOnlineFriend(friendStatus);
        }
    }, [])
    useEffect(() => {
        const updateMessages = () => {
            
            const roomNameNow = roomsListByUserSoul.get(soulNameNow);
            // console.log("roomNameNow", roomNameNow)
            if(roomNameNow && !isGroup){
                //console.log('magsContainer => roomNameNow', roomNameNow)
                const messagesForRoom = messagesContent.get(soulNameNow);
                if (messagesForRoom) {
                    //console.log("Before sorting:", messagesForRoom);
                    console.log('messagesForRoom', messagesForRoom)
                    setMessagesContainerByRoom(messagesForRoom);
                } else {
                    setMessagesContainerByRoom([])
                }
            }
            if(isGroup) {
                const messagesForRoom = messageGroupContent.get(soulNameNow);
                if (messagesForRoom) {
                    //console.log("Before sorting:", messagesForRoom);
                    //console.log('messagesForRoom', messagesForRoom)
                    setMessagesContainerByGroup(messagesForRoom);
                } else {
                    setMessagesContainerByGroup([])
                }
            }
            
        };

        updateMessages();
        console.log('messageGroupContent', messageGroupContent)
        scrollToBottom();
    
    }, [soulNameNow, messagesContent, messageGroupContent]);

    function onBlur(){
        setOnFocusStyle(false);
        setIsTyping(false);
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
    
    useEffect(()=>{
        const friendState = typingStateRoom.get(soulNameNow);
        if(typeof friendState === 'boolean'){
            setFriendIsTyping(friendState)
            //console.log('=========friendState=========', friendState)
        }
        
    }, [typingStateRoom])

    useEffect(()=>{
        //console.log('mudou o friendsOnline', friendsOnline, 'soulNameNow',soulNameNow)
        const friendStatus = friendsOnline.get(soulNameNow);
        if(typeof friendStatus === 'boolean') {
            setIsOnlineFriend(friendStatus);
        }
    }, [friendsOnline, soulNameNow])
    useEffect(()=>{
        console.log('messagesContainerByGroup', messagesContainerByGroup);
    }, [messagesContainerByGroup])
    return(
        <>
            {screenProps?.userSoul && !isGroup && (
                <div className="flex flex-col">
                    <div className="contactsContainer messagesContainer flex flex-col w-full h-full">
                        <div className="headerBarContacts headerBarMsgs py-[5px]">
                                <div className=" flex items-center gap-[.5em] cursor-pointer" onClick={()=>{
                                    setSoulNameNow('')
                                }}>
                                    <div className=" sectionDisplayOk text-white " style={{display: 'none'}}>
                                        {_isSemitic ? (
                                            <FaArrowRight />
                                        ):
                                        (
                                            <FaArrowLeft />      
                                        )}
                                    
                                    </div>
                                    
                                    <div className="profilePhotoMainContacts"
                                    onClick={()=>{
                                        desactiveScreens(
                                            {
                                                root: onProfile,
                                                competitors: [menu],
                                                setCompetitors: [setMenu],
                                                setRoot: setOnProfile,
                                                setOnMessages: setOnProfile
                                            }
                                        )
                                    }}>
                                        <Image alt="me" src={screenProps?.imageData.userImage || "/imgs/assets/person.png"} fill/>
                                    </div>
                                    <div className="onlineAndTyping" style={{scale: isOnlineFriend ? '0.9' : '1'}}>
                                        <span className="nameUserSpan">
                                            {screenProps.costumName.custom_name || screenProps.first_name}
                                        </span>
                                        <span className="digOrOn">
                                            {isOnlineFriend ?           (friendIsTyping ?   'Digitando...' : 'Online') : false
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="settingsContacts">
                                    <OptionsSwitch _isSemitic={_isSemitic} onClickSettings={()=>desactiveScreens(
                                        {
                                            root: menu, 
                                            competitors: [onProfile],  
                                            setCompetitors: [setOnProfile], 
                                            setRoot: setMenu,
                                            setOnMessages: setMenu
                                        }
                                    ) }/>
                                </div>
                        </div>
                        <div className="mainContacts mainMsgs">
                                <div className="fixed py-1 h-[72%] intermediateDivMsgs"> 
                                    <div className="main" >
                                        {
                                    
                                            messagesContainerByRoom.map((el, index) => {
                                                const createdDate = new Date(el.createdIn);
                                                const createdTime = createdDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                                    
                                                return (
                                                    <MessageLabel
                                                    soulName={soulNameNow} createdTime={createdTime} message={el} userSoul={userSoul} serverIo={serverIo}
                                                    setMessagesContent={setMessagesContent}
                                                    roomsListByUserSoul={roomsListByUserSoul} key={el.createdIn}/>
                                    
                                                );
                                            })
                                        }
                                    
                                        <div ref={messagesEndRef}/>
                                    </div>
                                </div>
                            
                           
                            
                        </div>
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
                    </div>
                </div>
            
            )}
            {groupsScreenProps?.userSoul && isGroup && (
                <div className="flex flex-col">
                    <div className="contactsContainer messagesContainer flex flex-col w-full h-full">
                        <div className="headerBarContacts headerBarMsgs py-[5px]">
                                <div className=" flex items-center gap-[.5em] cursor-pointer" onClick={()=>{
                                    setSoulNameNow('')
                                }}>
                                    <div className=" sectionDisplayOk text-white " style={{display: 'none'}}>
                                        {_isSemitic ? (
                                            <FaArrowRight />
                                        ):
                                        (
                                            <FaArrowLeft />      
                                        )}
                                    
                                    </div>
                                    
                                    <div className="profilePhotoMainContacts"
                                    onClick={()=>{
                                        desactiveScreens(
                                            {
                                                root: onProfile,
                                                competitors: [menu],
                                                setCompetitors: [setMenu],
                                                setRoot: setOnProfile,
                                                setOnMessages: setOnProfile
                                            }
                                        )
                                    }}>
                                        <Image alt="me" src={groupsScreenProps?.imageData.userImage || "/imgs/assets/person.png"} fill/>
                                    </div>
                                    <div className="onlineAndTyping" style={{scale: isOnlineFriend ? '0.9' : '1'}}>
                                        <span className="nameUserSpan">
                                            {groupsScreenProps.groupName}
                                        </span>
                                        {/*<span className="digOrOn">
                                            {isOnlineFriend ?           (friendIsTyping ?   'Digitando...' : 'Online') : false
                                            }
                                        </span>*/}
                                    </div>
                                </div>
                                <div className="settingsContacts">
                                    <OptionsSwitch _isSemitic={_isSemitic} onClickSettings={()=>desactiveScreens(
                                        {
                                            root: menu, 
                                            competitors: [onProfile],  
                                            setCompetitors: [setOnProfile], 
                                            setRoot: setMenu,
                                            setOnMessages: setMenu
                                        }
                                    ) }/>
                                </div>
                        </div>
                        <div className="mainContacts mainMsgs">
                                <div className="fixed py-1 h-[72%] intermediateDivMsgs"> 
                                    <div className="main" >
                                        {
                                    
                                            messagesContainerByGroup.map((msg, index) => {
                                                const createdDate = new Date(msg.createdIn);
                                                const createdTime = createdDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                                    
                                                return (
                                                    <div className="p-[2em] bg-slate-200" key={msg.createdIn}>
                                                        {msg.message}
                                                    </div>
                                                );
                                            })
                                        }
                                    
                                        <div ref={messagesEndRef}/>
                                    </div>
                                </div>
                        </div>
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
                    </div>
                </div>
            
            )}
        </>   
    )
}

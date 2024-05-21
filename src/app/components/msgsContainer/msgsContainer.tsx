"use client"

import { desactiveScreens } from "@/services/desactiveScreens.service";
import { useEffect, useState, SetStateAction, Dispatch, useRef } from 'react';
import Image from "next/image";
import { IoSettingsOutline } from "react-icons/io5";
import { propsMessagesContent, propsRoom } from "../alpostelMain/alpostelMain";
import { IoMdSend } from "react-icons/io";
import {  MdOutlineEmojiEmotions } from "react-icons/md";
import { ConnectM2 } from "@/services/connectToM2.service";
import { sendMsg } from "@/services/connectToM2.service";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import MessageLabel from "../messageLabel/messageLabel";
import TextareaMsg from "../textareaMsg/textareaMsg";

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
    friendsOnline: Map<string, boolean>
}
export default function MsgsContainer({screenMsg, messagesContent, _isSemitic, serverIo, userSoul, soulNameNow, setMessagesContent, setSoulNameNow, roomsListByUserSoul, typingStateRoom, friendsOnline}: propsMsgContainer){
    const [onProfile, setOnProfile] = useState<boolean>(false);
    const [screenProps, setScreenProps] = useState<propsRoom>()
    const [menu, setMenu] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>("");
    const [messagesContainerByRoom, setMessagesContainerByRoom] = useState<propsMessagesContent[]>([]);
    const [isTyping, setIsTyping] = useState<boolean>(false)
    const [friendIsTyping, setFriendIsTyping] = useState<boolean>(false)
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isOnlineFriend, setIsOnlineFriend] = useState<boolean>(false)

    useEffect(()=>{
        const msgArray = Array.from(screenMsg.values());
        setScreenProps(msgArray[0]);
        console.log("msgArray", msgArray)
       
    }, [screenMsg]);

    const [onFocusStyle, setOnFocusStyle] = useState<boolean>(false);
    const onFocus = ()=>{
        setOnFocusStyle(true);
        
    }

    function sendMsg(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        if(msg.length > 0 && screenProps?.userSoul) {
            const dateInf = new Date(); 
            const createdIn = dateInf.toISOString();
            const roomNameNow = roomsListByUserSoul.get(soulNameNow);
            const msgS: sendMsg = {fromUser: userSoul, deletedTo: "none", message: msg, toUser: screenProps.userSoul, createdIn, toRoom: roomNameNow};
            console.log("msgS",msgS);
            serverIo.sendMsg(false, msgS);
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
        console.log('friendsOnline', friendsOnline)
        if(typeof friendStatus === 'boolean') {
            
            setIsOnlineFriend(friendStatus);
        }
    }, [])
    useEffect(() => {
        const updateMessages = () => {
            
            const roomNameNow = roomsListByUserSoul.get(soulNameNow);
            console.log("roomNameNow", roomNameNow)
            if(roomNameNow){
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
            
        };

        updateMessages();
        
        scrollToBottom();
    
    }, [soulNameNow, messagesContent]);

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
        console.log('isTyping', isTyping);
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
        console.log('mudou o friendsOnline', friendsOnline, 'soulNameNow',soulNameNow)
        const friendStatus = friendsOnline.get(soulNameNow);
        if(typeof friendStatus === 'boolean') {
            setIsOnlineFriend(friendStatus)
        }
    }, [friendsOnline, soulNameNow])
    return(
        <>
            {screenProps?.userSoul && (
                <div className="flex flex-col">
                    <div className="contactsContainer messagesContainer flex flex-col w-full h-full">
                        <div className="headerBarContacts py-[5px]">
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
                                <div className="settingsContacts"
                                style={{transform: menu ? "rotate(180deg)": "rotate(0deg)"}} onClick={()=>{
                                    desactiveScreens(
                                        {
                                            root: menu, 
                                            competitors: [onProfile],  
                                            setCompetitors: [setOnProfile], 
                                            setRoot: setMenu,
                                            setOnMessages: setMenu
                                        }
                                )  
                                }}>
                                <IoSettingsOutline className="text-[1.5em] text-white"/>
                            </div>
                        </div>
                        <div className="mainContacts mainMsgs">
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
                        <div className=" footerBarMsgs">
                            <form onSubmit={sendMsg} className="footerBarContacts formFooterBar flex w-full items-center justify-between py-2">
                                <div className="emojiBtn">
                                    <MdOutlineEmojiEmotions className="text-white w-[75%] h-[75%]"/>
                                </div>   
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

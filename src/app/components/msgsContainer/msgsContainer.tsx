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
import { RiDeleteBin6Line } from "react-icons/ri";
import MessageLabelGroup from "../messageLabelGroup/messageLabelGroup";
import GroupMsgs, { deleteMsgsGroup } from "../groupMsgs/groupMsgs";

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
    setMessagesGroupContent: Dispatch<SetStateAction<Map<string, propsMessagesGroupContent[]>>>;
    participantsBgColor: Map<string, Map<string, string>>;
    groupsDataById: Map<string, propsGroups>;
    updateRooms: Map<string, propsRoom[]>;
    participantsData: Map<string, propsRoom>
}
export default function MsgsContainer({screenMsg, messagesContent, _isSemitic, serverIo, userSoul, soulNameNow, setMessagesContent, setSoulNameNow, roomsListByUserSoul, typingStateRoom, friendsOnline, isGroup, screenMsgGroup, messageGroupContent, setMessagesGroupContent, participantsBgColor, groupsDataById, updateRooms, participantsData}: propsMsgContainer){
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
    const [imageURL, setImageURL] = useState<string>();
    const [deleteMsgScreen, setDeleteMsgScreen] = useState<boolean>(false);
    const [msgCreatedInDelete, setMsgCreatedInDelete] = useState<string[]>([]);
    const [showDeleteAll, setShowDeleteAll] = useState<boolean>(false)
    useEffect(()=>{
        if(isGroup){
            let groupData = groupsDataById.get(soulNameNow);
            if(groupData) {
                setImageURL(groupData.imageData.userImage)
            }
        } else {
            let roomData = updateRooms.get(soulNameNow);
            if(roomData) {
                setImageURL(roomData[0].imageData.userImage)
            }
        }
    }, [groupsScreenProps, screenProps, groupsDataById, updateRooms, soulNameNow])
    useEffect(()=>{
        if(isGroup){
            const msgArray = Array.from(screenMsgGroup.values());
            setGroupsScreenProps(msgArray[0]);
            //console.log("msgArray", msgArray);

        } else {
            const msgArray = Array.from(screenMsg.values());
            setScreenProps(msgArray[0]);
            //console.log("msgArray", msgArray);
        }
        
       
    }, [screenMsgGroup, screenMsg, isGroup]);
    const onFocus = ()=>{
        setOnFocusStyle(true);
        
    }

    function sendMsg(event: React.FormEvent<HTMLFormElement>){
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
                const msgS: sendMsgGroup = {
                    createdIn,
                    deletedTo: "none",
                    fromUser: userSoul,
                    message: msg,
                    toGroup: soulNameNow,
                    toUsers: groupsScreenProps.groupParticipants,
                    viewStatus: undefined
                };
                //console.log('msgS Group: ', msgS)
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
                    //console.log('messagesForRoom', messagesForRoom)
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
        //console.log('messageGroupContent', messageGroupContent)
        scrollToBottom();
        console.log("messagesContent", messagesContent)
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
            setFriendIsTyping(friendState);
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
        function checkMessagesToDelete(messages: any[]): boolean {
            let diverge = messages.filter((msg)=> msgCreatedInDelete.includes(msg.createdIn) && 
            ((msg.deletedTo !== "none" && msg.deletedTo !== "justTo" /*|| msg.deletedTo === ""*/) || msg.fromUser !== userSoul))
            
            return diverge.length > 0 ? false : true;
        };
    
        if (groupsScreenProps?.userSoul && isGroup) {
            setShowDeleteAll(checkMessagesToDelete(messagesContainerByGroup));
        } else if (screenProps?.userSoul && !isGroup) {
            setShowDeleteAll(checkMessagesToDelete(messagesContainerByRoom));
        }
    }, [msgCreatedInDelete])

    async function deleteMsgFunc(deletedTo: "none" | "justTo" | "justAll" | "justFrom" | "all" | "allFrom" | "allTo", createdIn: string, fromUser: string, toUser?:string, toUsers?:string[]) {
        if(isGroup && toUsers){
            let resp = await serverIo.deleteGroupMsg({createdIn, deletedTo, room: soulNameNow, fromUser, toUsers});

            console.log("resp", resp)
        } else {
            let roomName = roomsListByUserSoul.get(soulNameNow);
            if(roomName && toUser){
                let resp = await serverIo.deleteDuoMsg({createdIn, deletedTo, room: roomName, fromUser, toUser});
                console.log("resp", resp)
            }
        }
    }

    async function deleteMsg(deletedTo: "none" | "justTo" | "justAll" | "justFrom" | "all" | "allFrom" | "allTo") {
        if (msgCreatedInDelete.length > 0) {
            if(isGroup){
                await deleteMsgsGroup({deletedTo, messagesContainerByGroup, msgCreatedInDelete, room: soulNameNow, serverIo, userSoul});
            }
            if (!showDeleteAll) { // Se nao for delete para todos
                if (isGroup) {
                    /*const justToMsgs = messagesContainerByGroup.filter(msg =>
                        msgCreatedInDelete.includes(msg.createdIn) && msg.fromUser !== userSoul
                    );
    
                    let justToCreatedIn: string[] = justToMsgs.map(msg => msg.createdIn);
    
                    for (const crdIn of justToCreatedIn) {
                        const msg = messagesContainerByGroup.find(el => el.createdIn === crdIn);
                        if (msg) {
                            await deleteMsgFunc("justTo", crdIn, msg.fromUser, undefined, msg.toUsers);
                        }
                    }
    
                    let normalDelete = msgCreatedInDelete.filter(crdIn => !justToCreatedIn.includes(crdIn));
                    for (const crdIn of normalDelete) {
                        const msg = messagesContainerByGroup.find(el => el.createdIn === crdIn);
                        if (msg) {
                            await deleteMsgFunc(deletedTo, crdIn, msg.fromUser, undefined, msg.toUsers);
                        }
                    }*/

                } else {
                    const justToMsgs = messagesContainerByRoom.filter(msg =>
                        msgCreatedInDelete.includes(msg.createdIn) && msg.fromUser !== userSoul
                    );
    
                    let justToCreatedIn: string[] = justToMsgs.map(msg => msg.createdIn);
    
                    for (const crdIn of justToCreatedIn) {
                        const msg = messagesContainerByRoom.find(el => el.createdIn === crdIn);
                        if (msg) {
                            await deleteMsgFunc("justTo", crdIn, msg.fromUser, msg.toUser);
                        }
                    }
    
                    let normalDelete = msgCreatedInDelete.filter(crdIn => !justToCreatedIn.includes(crdIn));
                    for (const crdIn of normalDelete) {
                        const msg = messagesContainerByRoom.find(el => el.createdIn === crdIn);
                        if (msg) {
                            await deleteMsgFunc(deletedTo, crdIn, msg.fromUser, msg.toUser);
                        }
                    }
                }
            } else {
                for (const crdIn of msgCreatedInDelete) {
                    let fromUser = '';
                    let toUser = '';
    
                    if (!isGroup) {
                        /*
                        if(isGroup){
                        const msg = messagesContainerByGroup.find(el => el.createdIn === crdIn);
                        if (msg) {
                            fromUser = msg.fromUser;
                            toUsers = msg.toUsers;
                            await deleteMsgFunc(deletedTo, crdIn, fromUser, undefined, toUsers);
                        }
                        }*/
                        
                    
                        const msg = messagesContainerByRoom.find(el => el.createdIn === crdIn);
                        if (msg) {
                            fromUser = msg.fromUser;
                            toUser = msg.toUser;
                            await deleteMsgFunc(deletedTo, crdIn, fromUser, toUser, undefined);
                        }
                    }
                }
            }
        }
    }
    
    

    return(
        <> 
            {((groupsScreenProps?.userSoul && isGroup) || (screenProps?.userSoul && !isGroup)) && (
                <div className="flex flex-col relative">
                    <div className="contactsContainer messagesContainer flex flex-col w-full h-full">
                        <div className="headerBarContacts headerBarMsgs py-[5px]">
                            {msgCreatedInDelete.length > 0 ? (
                                <div className="flex items-center justify-between w-[100%]">
                                    <div className="flex justify-between items-center gap-[1em]">
                                        <div className=" flex items-center cursor-pointer" onClick={()=>{
                                            setMsgCreatedInDelete([])
                                        }}>
                                            <div className=" sectionDisplayOk text-white " >
                                                {_isSemitic ? (
                                                    <FaArrowRight />
                                                ):
                                                (
                                                    <FaArrowLeft />
                                                )}
                                        
                                            </div>
                                        </div>
                                        <div>
                                            <h1 className="text-white
                                            font-[400] text-[19px]">
                                                {msgCreatedInDelete.length}
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="binMsgsBtn flex justify-center items-center">
                                        <h2 className="binMsgs" onClick={()=>{
                                            setDeleteMsgScreen(!deleteMsgScreen)
                                        }}>
                                            <RiDeleteBin6Line />
                                        </h2>
                                    </div>
                                </div>
                            ) : (
                                <>
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
                                            <Image alt="me" src={imageURL || "/imgs/assets/person.png"} fill/>
                                        </div>
                                        <div className="onlineAndTyping" style={{scale: isOnlineFriend ? '0.9' : '1'}}>
                                            <span className="nameUserSpan">
                                                {screenProps ? (screenProps.costumName.custom_name || screenProps.first_name):
                                                (groupsScreenProps &&
                                                groupsScreenProps.groupName)
                                                }
                                            </span>
                                            {
                                                !groupsScreenProps && (
                                                    <span className="digOrOn">
                                                    {isOnlineFriend ?           (friendIsTyping ?   'Digitando...' : 'Online') : false
                                                    }
                                                    </span>
                                                ) 
                                            }
                                            
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
                                </>
                            )}
                                
                        </div>
                        <div className="mainContacts mainMsgs">
                            <div className="fixed py-1 h-[72%] intermediateDivMsgs"> 
                                <div className="main" >
                                    {screenProps?.userSoul && !isGroup && (
                                        messagesContainerByRoom.map((el) => {
                                            const createdDate = new Date(el.createdIn);
                                            const createdTime = createdDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                                
                                            return (
                                                <MessageLabel
                                                soulName={soulNameNow} createdTime={createdTime} message={el} userSoul={userSoul} serverIo={serverIo}
                                                setMessagesContent={setMessagesContent}
                                                roomsListByUserSoul={roomsListByUserSoul} key={el.createdIn}
                                                participantsData={participantsData}
                                                setMsgCreatedInDelete={setMsgCreatedInDelete}
                                                createdIn={el.createdIn}
                                                msgCreatedInDelete={msgCreatedInDelete}
                                                deletedTo={el.deletedTo}
                                                fromUser={el.fromUser} />
                                            );
                                        })
                                    )}
                                    {
                                        groupsScreenProps?.userSoul && isGroup && 
                                        <GroupMsgs messagesContainerByGroup={messagesContainerByGroup}
                                        msgCreatedInDelete={msgCreatedInDelete}
                                        participantsBgColor={participantsBgColor}
                                        participantsData={participantsData} roomsListByUserSoul={roomsListByUserSoul}
                                        serverIo={serverIo}
                                        setMessagesGroupContent={setMessagesGroupContent}
                                        setMsgCreatedInDelete={setMsgCreatedInDelete}
                                        soulNameNow={soulNameNow}
                                        userSoul={userSoul}/>
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
            {deleteMsgScreen && (
                <div className="deleteMsgScreen" onClick={(e)=>{
                    if(e.target === e.currentTarget){
                        setDeleteMsgScreen(false);
                    }
                }}>
                    <div className="optContainer">
                        <h3>
                            Deseja apagar {
                            msgCreatedInDelete.length > 1 ? 
                            `${msgCreatedInDelete.length} mensagens` 
                            : 
                            "a mensagem"
                            }?
                        </h3>
                        <div className="options">
                            {showDeleteAll && (
                                <button className="btnStyleOpt" onClick={()=>{
                                    deleteMsg("all");
                                    setDeleteMsgScreen(false);
                                    setMsgCreatedInDelete([]);
                                }}>Apagar para todos</button>
                            )}
                            <button className="btnStyleOpt" onClick={()=>{
                                deleteMsg("justFrom")
                                setDeleteMsgScreen(false);
                                setMsgCreatedInDelete([]);
                            }}>Apagar para mim</button>
                            <button
                            onClick={()=>{
                                setDeleteMsgScreen(false); 
                            }} className="btnStyleOpt">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
           
        </>   
    )
}

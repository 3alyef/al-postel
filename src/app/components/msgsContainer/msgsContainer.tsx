"use client";

import { useEffect, useState, SetStateAction, Dispatch, useRef } from 'react';
import { propsMessagesContent, propsMessagesGroupContent, propsRoom } from "../alpostelMain/alpostelMain";
import { ConnectM2, DeletedToType } from "@/services/connectToM2.service";
import MessageLabel from "../messageLabel/messageLabel";
import { propsGroups } from "@/interfaces/groups.interface";
import GroupMsgs, { deleteMsgsGroup, stringToMap } from "../groupMsgs/groupMsgs";
import HeaderMsgShow from './components/header/header';
import FooterMsgShow from './components/footer/footer';

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
    
    const [screenProps, setScreenProps] = useState<propsRoom>();
    const [groupsScreenProps, setGroupsScreenProps] = useState<propsGroups>();
    const [messagesContainerByRoom, setMessagesContainerByRoom] = useState<propsMessagesContent[]>([]);
    const [messagesContainerByGroup, setMessagesContainerByGroup] = useState<propsMessagesGroupContent[]>([]);
    const [friendIsTyping, setFriendIsTyping] = useState<boolean>(false)
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isOnlineFriend, setIsOnlineFriend] = useState<boolean>(false);
    const [deleteMsgScreen, setDeleteMsgScreen] = useState<boolean>(false);
    const [msgCreatedInDelete, setMsgCreatedInDelete] = useState<string[]>([]);
    const [showDeleteAll, setShowDeleteAll] = useState<boolean>(false)
    
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
            if(roomNameNow && !isGroup){
                const messagesForRoom = messagesContent.get(soulNameNow);
                if (messagesForRoom) {
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
            let diverge: any[];
            if(isGroup){
                diverge = messages.filter((msg)=> msgCreatedInDelete.includes(msg.createdIn) && (Array.from(stringToMap(msg.deletedTo).values()).some(del => del !== "none" && del !== "justTo") || msg.fromUser !== userSoul
                ))
            } else {
                diverge = messages.filter((msg)=> msgCreatedInDelete.includes(msg.createdIn) && (msg.deletedTo !== "none" && msg.deletedTo !== "justTo") || msg.fromUser !== userSoul
                )
            }
            return diverge.length > 0 ? false : true;
        };
    
        if (groupsScreenProps?.userSoul && isGroup) {
            setShowDeleteAll(checkMessagesToDelete(messagesContainerByGroup));
        } else if (screenProps?.userSoul && !isGroup) {
            setShowDeleteAll(checkMessagesToDelete(messagesContainerByRoom));
        }
    }, [msgCreatedInDelete])

    async function deleteMsgFunc(deletedTo: DeletedToType, createdIn: string, fromUser: string, toUser:string) {
        if(!isGroup){
            let roomName = roomsListByUserSoul.get(soulNameNow);
            if(roomName && toUser){
                let resp = await serverIo.deleteDuoMsg({createdIn, deletedTo, room: roomName, fromUser, toUser});
                console.log("resp", resp)
            }
        }
    }

    async function deleteMsg(deletedTo: DeletedToType) {
        if (msgCreatedInDelete.length > 0) {
            if(isGroup){
                await deleteMsgsGroup({deletedTo, messagesContainerByGroup, msgCreatedInDelete, room: soulNameNow, serverIo, userSoul});
            }
            if (!showDeleteAll) { // Se nao for delete para todos
                if (!isGroup) {
                    const justToMsgs = messagesContainerByRoom.filter(msg =>
                        msgCreatedInDelete.includes(msg.createdIn) && msg.fromUser !== userSoul
                    ); // somente as msgs que nao foram enviados pelo user
    
                    let justToCreatedIn: string[] = justToMsgs.map(msg => msg.createdIn);
    
                    for (const crdIn of justToCreatedIn) {
                        const msg = messagesContainerByRoom.find(el => el.createdIn === crdIn);
                        if (msg) {
                            await deleteMsgFunc("justTo", crdIn, msg.fromUser, msg.toUser);
                        }
                    } // aqui atualiza o status das mensagens que nao foram enviadas pelo usuario
    
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
                        const msg = messagesContainerByRoom.find(el => el.createdIn === crdIn);
                        if (msg) {
                            fromUser = msg.fromUser;
                            toUser = msg.toUser;
                            await deleteMsgFunc(deletedTo, crdIn, fromUser, toUser);
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
                        <HeaderMsgShow
                        _isSemitic={_isSemitic}
                        deleteMsgScreen={deleteMsgScreen}
                        friendIsTyping={friendIsTyping}
                        groupsScreenProps={groupsScreenProps}
                        isOnlineFriend={isOnlineFriend}
                        msgCreatedInDelete={msgCreatedInDelete}
                        screenProps={screenProps} 
                        setDeleteMsgScreen={setDeleteMsgScreen}
                        setMsgCreatedInDelete={setMsgCreatedInDelete}
                        setSoulNameNow={setSoulNameNow}
                        groupsDataById={groupsDataById} 
                        isGroup={isGroup}
                        soulNameNow={soulNameNow}
                        updateRooms={updateRooms}/>

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

                        <FooterMsgShow
                        _isSemitic={_isSemitic}
                        groupsScreenProps={groupsScreenProps}
                        isGroup={isGroup}
                        roomsListByUserSoul={roomsListByUserSoul}
                        screenProps={screenProps}
                        serverIo={serverIo}
                        soulNameNow={soulNameNow}
                        userSoul={userSoul}/>
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

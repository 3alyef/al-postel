
import { propsMessagesContent, propsRoom } from "@/app/components/alpostelMain/alpostelMain";
import { costumName, DataUser } from "@/interfaces/searchByEmail.interface";
import { Dispatch, SetStateAction } from "react";
import { io, Socket } from "socket.io-client";

export interface msgStatus {
    fromUser: string;
    toUser: string;
    room: string;
    createdIn: string;
    viewStatus: "onServer" | "delivered" | "seen";
}

export interface sendMsg {
    fromUser: string;
    deletedTo: "none" | "justFrom" | "all";
    viewStatus?: "onServer" | "delivered" | "seen";
    toUser: string;
    toRoom?: string;
    message: string;
    chatName?: string;
    toGroup?: string;
    createdIn: string
}

export type DecodedData  = {
    userId: string;
    userSoul: string;
    first_name: string;
    last_name: string;
    email: string;
    costumName: costumName;
    iat?: number;
    exp?: number;

}

export class ConnectM2 {
    public socket: Socket;
    private setMessagesContent: Dispatch<SetStateAction<Map <string, propsMessagesContent[]>>>
    constructor(m2: string, token: string, setMessagesContent: Dispatch<SetStateAction<Map <string, propsMessagesContent[]>>>) {
        this.setMessagesContent = setMessagesContent;
        this.socket = io(m2, {
            extraHeaders: {
                authorization: token // Vamos adicionar o token de autorização aqui
            }
        });
    }

    public initialize(setUpdateRooms:Dispatch<SetStateAction<Map<string, propsRoom[]>>>, setUserSoul: Dispatch<SetStateAction<string>>, setRoomsListByUserSoul:Dispatch<SetStateAction<Map<string, string>>>, setTypingStateRoom: Dispatch<SetStateAction<Map<string, boolean>>>, setFriendsOnline: Dispatch<SetStateAction<Map<string, boolean>>>, setUserProps: Dispatch<SetStateAction<DecodedData[]>>) {
        this.socket.on("connect", () => {
            console.log("Conectado com sucesso! ID do socket:", this.socket.id);
        });

        this.socket.on("updateSoul", (el: {soulName: string, userProps: DecodedData})=>{
            setUserSoul(el.soulName);
            setUserProps((prev)=>{
                const newV = prev;
                if(newV.length === 0){
                    newV.push(el.userProps)
                }
                
                return newV
            });
        })
        // Adicionando um ouvinte para o evento "disconnect"
        this.socket.on("disconnect", () => {
            console.log("Desconectado do servidor Socket.IO");
            setFriendsOnline((prev)=>{
                const newFriendsOnline = new Map(prev);
                newFriendsOnline.forEach((value, key, map) => {
                    map.set(key, false); 
                });
                return newFriendsOnline;
            })
        });
        
        this.socket.on("updateAll", (el: {
            message: string, 
            content: any, 
            friendData: propsRoom, 
            userSoul: string    
        }) => {
            //console.log("aqui",el)
            if (el.message === "add_room" && typeof el.content === "string") {
                setRoomsListByUserSoul((previous)=>{
                    const roomsList: Map<string, string> = new Map(previous);
                    roomsList.delete(el.friendData.userSoul)
                    roomsList.set(el.friendData.userSoul, el.content)
                    console.log('roomsList', previous)
                    return roomsList;
                })
                setUpdateRooms((previous) => {
                    const newRooms: Map<string, propsRoom[]> = new Map<string, propsRoom[]>(previous);
        
                   
                    const newRoom: propsRoom = {
                        userSoul: el.friendData.userSoul,
                        email: el.friendData.email,
                        costumName: el.friendData.costumName,
                        first_name: el.friendData.first_name,
                        imageData: el.friendData.imageData,
                        last_name: el.friendData.last_name
                    };
        
                    // Adiciona a nova sala
                    if (!newRooms.has(el.friendData.userSoul)) {
                        newRooms.set(el.friendData.userSoul, [newRoom]);
                    } else {
                        const rooms = newRooms.get(el.friendData.userSoul);
                        if (rooms) {
                            const equalUser = rooms.some(user => user.userSoul === el.friendData.userSoul);
                            if (!equalUser) {
                                rooms.push(newRoom);
                            }
                        }
                    }
        
                    return newRooms;
                });
            } 
            
            setTypingStateRoom((prev)=>{
                const typingStates = new Map<string, boolean>(prev)
                const userNow = typingStates.get(el.friendData.userSoul);
                if(!userNow){
                    typingStates.set(el.friendData.userSoul, false)
                }
                return typingStates
            })

            setFriendsOnline((prev)=>{
                const friendsOnline = new Map<string, boolean>(prev);
               
                friendsOnline.set(el.friendData.userSoul, false);
                
                return friendsOnline
            })
            
        });

        this.socket.on("previousMsgs", (el: {messageData: propsMessagesContent[], room: string, msgCase: string})=>{
            if(el.messageData.length > 0) {
                console.log('msgCase',el.msgCase)
                this.setMessagesContent((prev)=>{
                    const newMessages: Map <string, propsMessagesContent[]> = new Map<string, propsMessagesContent[]>(prev);
                    /*if (newMessages.has(el.msgCase)) {
                        const rooms = newMessages.get(el.msgCase)
                        rooms?.push(...el.messageData);
                    } else {
                        newMessages.set(el.msgCase, el.messageData);
                    }*/
                    newMessages.set(el.msgCase, el.messageData);
                    //console.log("previousMsgs + new", newMessages);
                   
                    return newMessages;
                })
            }
            
        })

        this.socket.on("newMsg", (el: {messageData: propsMessagesContent, room: string})=>{
           this.addMsg({...el, msgCase: el.messageData.fromUser})
        })

        this.socket.on("msgStatus", (data: msgStatus)=>{
            console.log('msgStatus', data)
            this.setMessagesContent((previous) => {
                const newMessages: Map <string, propsMessagesContent[]> = new Map<string, propsMessagesContent[]>(previous);
                newMessages.forEach((value, key)=>{
                    if(key === data.toUser){
                        const updatedMessages = value.map((msg) => {
                            if (msg.createdIn === data.createdIn) {
                                return { ...msg, viewStatus: data.viewStatus };
                            }
                            return msg;
                        });
        
                        newMessages.set(key, updatedMessages);
                    }
                })
                return newMessages
            });
        })

        this.socket.on("setTypingState", ({state, userSoulFrom}:{state: boolean, userSoulFrom: string})=>{
            //console.log('setTypingState', {state, userSoulFrom})
            
            setTypingStateRoom((prev)=>{
                let typingStates = new Map(prev);
                //console.log('updatedTypingStates', typingStates);
                typingStates.set(userSoulFrom, state);
                //console.log('updatedTypingStates', typingStates);
                return typingStates;
            })
        })
        this.socket.on("updateFriendsOnline", ({userSoul, online}: {userSoul: string, online: boolean})=>{
            console.log({ userSoul, online });
           
            setFriendsOnline((prev)=>{
                const friendsOnline = new Map<string, boolean>(prev);
               
                friendsOnline.set(userSoul, online);
                
                return friendsOnline
            })
        })
       
    }
    public searchUser(userDataMethod: string): Promise<DataUser[] | string>{
        return new Promise((resolve, reject) => {
            this.socket.emit("searchUser", { userDataMethod });
            this.socket.on("searchUser", (el: DataUser[] | string) => {
                resolve(el);
                // remove o listener após a resolução da promessa
                this.socket.off("searchUser");
            });
            this.socket.on("searchUserError", (error: any) => {
                reject(error);
                this.socket.off("searchUserError");
            });
        });
        
    }
    public makeNetwork(soulName: string): Promise<{friendData: propsRoom} | string>{
        return new Promise((resolve, reject) => {
            this.socket.emit("connectFriend", { friendName: soulName });
            
            this.socket.on("connectFriendSucess", (el: {friendData: propsRoom})=>{
                console.log('connectFS', el)
                resolve(el)
            })
            this.socket.on("connectFriendError", (error: any) => {
                reject(error);
                this.socket.off("connectFriendError");
            });
            
                
           
        });
    }

    public sendMsg(isGroup: boolean, msgData: sendMsg) {
        
        if(!isGroup && msgData.toRoom){
            this.socket.emit("sendMsg", {fromUser: msgData.fromUser, deletedTo: msgData.deletedTo, toUser: msgData.toUser, toRoom: msgData.toRoom, message: msgData.message, createdIn: msgData.createdIn})
            this.addMsg({messageData: {...msgData}, room: msgData.toRoom, msgCase: msgData.toUser})
        }else if(isGroup && msgData.toGroup){
            this.socket.emit("sendMsg", {fromUser: msgData.fromUser, deletedTo: msgData.deletedTo, message: msgData.message, toGroup: msgData.toGroup, createdIn: msgData.createdIn})
        } 
    }
    public newGroup(soulName: string){
        this.socket.emit("newGroup", {soulName})
    }

    private addMsg(el: {messageData: propsMessagesContent, room: string, msgCase: string}){
        this.setMessagesContent((previous) => {
            const newMessages: Map <string, propsMessagesContent[]> = new Map<string, propsMessagesContent[]>(previous);
            
            if (el.messageData) {
                const newMessage: propsMessagesContent = {
                    fromUser: el.messageData.fromUser,
                    deletedTo: el.messageData.deletedTo,
                    viewStatus: el.messageData.viewStatus,
                    toUser: el.messageData.toUser,
                    message: el.messageData.message,
                    createdIn: el.messageData.createdIn
                };
                if (newMessages.has(el.msgCase)) {
                    const rooms = newMessages.get(el.msgCase);
                    rooms?.push(newMessage);
                    
                } else {
                    newMessages.set(el.msgCase, [newMessage]);
                }
                return newMessages;
            } else {
                return previous;
            }
            
        });
    }

    public msgSeenUpdate(data: msgStatus){
        this.socket.emit("msgSeenUpdate", {...data})
    }

    public setTypingState({state, userSoulFrom, userSoulTo}:{state: boolean, userSoulFrom: string, userSoulTo: string}) {
        this.socket.emit("setTypingState", {state, userSoulFrom, userSoulTo})
    }
}

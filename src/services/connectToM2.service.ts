
import { propsMessagesContent, propsRoom } from "@/app/components/alpostelMain/alpostelMain";
import { costumName, DataUser } from "@/interfaces/searchByEmail.interface";
import { Dispatch, SetStateAction } from "react";
import { io, Socket } from "socket.io-client";

export interface msgStatus {
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

    public initialize(setUpdateRooms:Dispatch<SetStateAction<Map<string, propsRoom[]>>>, setUserSoul: Dispatch<SetStateAction<string>>) {
        this.socket.on("connect", () => {
            console.log("Conectado com sucesso! ID do socket:", this.socket.id);
        });

        this.socket.on("updateSoul", (el: {soulName: string})=>{
            setUserSoul(el.soulName)
        })
        // Adicionando um ouvinte para o evento "disconnect"
        this.socket.on("disconnect", () => {
            console.log("Desconectado do servidor Socket.IO");
        });
        
        this.socket.on("updateAll", (el: {
            message: string, 
            content: any, 
            friendData: propsRoom, 
            userSoul: string | undefined    
        }) => {
            //console.log("aqui",el)
            if (el.message === "add_room" && typeof el.content === "string") {
                setUpdateRooms((previous) => {
                    // Criamos uma cópia do mapa existente, ou criamos um novo mapa vazio se o mapa atual for nulo
                    const newRooms: Map<string, propsRoom[]> = new Map<string, propsRoom[]>(previous || []);
        
                    // Adicionamos a nova sala de bate-papo, se necessário
                    const newRoom: propsRoom = {
                        userSoul: el.friendData.userSoul,
                        email: el.friendData.email,
                        costumName: el.friendData.costumName,
                        first_name: el.friendData.first_name,
                        imageData: el.friendData.imageData,
                        last_name: el.friendData.last_name
                    };
                    if (newRooms.has(el.content)) {
                        const rooms = newRooms.get(el.content)
                        //?.push(newRoom);
                        console.log('them ----')
                        if(rooms?.length === 0) {
                            rooms?.push(newRoom);
                        }
                    } else {
                        newRooms.set(el.content, [newRoom]);
                    }
        
                    //console.log("updateRooms", newRooms);
                    return newRooms;
                });
            }
        
            if(typeof el.userSoul === "string") {
                setUserSoul(el.userSoul)
            }
        });

        this.socket.on("previousMsgs", (el: {messageData: propsMessagesContent[], room: string})=>{
            if(el.messageData.length > 0) {
                this.setMessagesContent((prev)=>{
                    const newMessages: Map <string, propsMessagesContent[]> = new Map<string, propsMessagesContent[]>(prev || []);
                    if (newMessages.has(el.room)) {
                        const rooms = newMessages.get(el.room)
                        rooms?.push(...el.messageData);

                        
                    } else {
                        newMessages.set(el.room, el.messageData);
                    }
        
                    console.log("previousMsgs + new", newMessages);
                    return newMessages;
                })
            }
            
        })

        this.socket.on("newMsg", (el: {messageData: propsMessagesContent, room: string})=>{
           this.addMsg(el)
        })

        this.socket.on("msgStatus", (data: msgStatus)=>{
            this.setMessagesContent((previous) => {
                const newMessages: Map <string, propsMessagesContent[]> = new Map<string, propsMessagesContent[]>(previous);
                newMessages.forEach((value, key)=>{
                    if(key === data.room){
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
    public makeNetwork(soulName: string): Promise<string>{
        return new Promise((resolve, reject) => {
            this.socket.emit("connectFriend", { friendName: soulName });
            
            this.socket.on("connectFriendError", (error: any) => {
                reject(error);
                this.socket.off("connectFriendError");
            });
        });
    }
    
    public connectFriend(soulName: string){
        this.socket.emit("connectFriend", {soulName})
    }
    public sendMsg(isGroup: boolean, msgData: sendMsg) {
        
        if(!isGroup && msgData.toRoom){
            this.socket.emit("sendMsg", {fromUser: msgData.fromUser, deletedTo: msgData.deletedTo, toUser: msgData.toUser, toRoom: msgData.toRoom, message: msgData.message, createdIn: msgData.createdIn})
            this.addMsg({messageData: {...msgData}, room: msgData.toRoom})
        }else if(isGroup && msgData.toGroup){
            this.socket.emit("sendMsg", {fromUser: msgData.fromUser, deletedTo: msgData.deletedTo, message: msgData.message, toGroup: msgData.toGroup, createdIn: msgData.createdIn})
        } 
    }
    public newGroup(soulName: string){
        this.socket.emit("newGroup", {soulName})
    }

    private addMsg(el: {messageData: propsMessagesContent, room: string}){
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
                if (newMessages.has(el.room)) {
                    const rooms = newMessages.get(el.room)
                    rooms?.push(newMessage);
                    
                } else {
                    newMessages.set(el.room, [newMessage]);
                }
                return newMessages;
            } else {
                return previous;
            }
            
        });
    }
}

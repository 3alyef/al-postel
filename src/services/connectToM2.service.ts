
import { propsMessagesContent, propsRoom } from "@/app/components/alpostelMain/alpostelMain";
import { costumName, DataUser } from "@/interfaces/searchByEmail.interface";
import { Dispatch, SetStateAction } from "react";
import { io, Socket } from "socket.io-client";


export interface sendMsg {
    fromUser: string;
    toUser: string;
    toRoom?: string;
    message: string;
    chatName?: string;
    toGroup?: string;
    createdIn: string
}

export class ConnectM2 {
    public socket: Socket;

    constructor(m2: string, token: string) {
        this.socket = io(m2, {
            extraHeaders: {
                authorization: token // Vamos adicionar o token de autorização aqui
            }
        });
    }

    public initialize(setUpdateRooms:Dispatch<SetStateAction<Map<string, propsRoom[]>>>, setUserSoul: Dispatch<SetStateAction<string>>, setMessagesContainer: Dispatch<SetStateAction<Map <string, propsMessagesContent[]>>>) {
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

        this.socket.on("previousMsgs", (el: {messageData: propsMessagesContent, room: string})=>{
            //console.log(el, el.messageData)
            setMessagesContainer((previous) => {
                const newMessages: Map <string, propsMessagesContent[]> = new Map<string, propsMessagesContent[]>(previous || []);
                
                if (el.messageData) {
                    const newMessage: propsMessagesContent = {
                        _id: el.messageData._id,
                        fromUser: el.messageData.fromUser,
                        toUser: el.messageData.toUser,
                        message: el.messageData.message,
                        createdIn: el.messageData.createdIn
                        // outras propriedades, se houver
                    };
                    if (newMessages.has(el.room)) {
                        const rooms = newMessages.get(el.room)
                        rooms?.push(newMessage);
                        
                    } else {
                        newMessages.set(el.room, [newMessage]);
                    }
        
                    console.log("previousMsgs", newMessages, el);
                    return newMessages;
                }
                return newMessages;
            });
        })

        this.socket.on("newMsg", (el: {messageData: propsMessagesContent, room: string})=>{
            //console.log(el, el.messageData)
            setMessagesContainer((previous) => {
                const newMessages: Map <string, propsMessagesContent[]> = new Map<string, propsMessagesContent[]>(previous || []);
                
                if (el.messageData) {
                    const newMessage: propsMessagesContent = {
                        fromUser: el.messageData.fromUser,
                        toUser: el.messageData.toUser,
                        message: el.messageData.message,
                        createdIn: el.messageData.createdIn
                        // outras propriedades, se houver
                    };
                    if (newMessages.has(el.room)) {
                        const rooms = newMessages.get(el.room)
                        rooms?.push(newMessage);
                        
                    } else {
                        newMessages.set(el.room, [newMessage]);
                    }
        
                    console.log("previousMsgs", newMessages, el);
                    return newMessages;
                }
                return newMessages;
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
            this.socket.emit("sendMsg", {fromUser: msgData.fromUser, toUser: msgData.toUser, toRoom: msgData.toRoom, message: msgData.message, createdIn: msgData.createdIn})
        }else if(isGroup && msgData.toGroup){
            this.socket.emit("sendMsg", {fromUser: msgData.fromUser, message: msgData.message, toGroup: msgData.toGroup, createdIn: msgData.createdIn})
        } 
    }
    public newGroup(soulName: string){
        this.socket.emit("newGroup", {soulName})
    }
}

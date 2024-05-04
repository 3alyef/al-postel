
import { propsRoom } from "@/app/components/alpostelMain/alpostelMain";
import { costumName, DataUser } from "@/interfaces/searchByEmail.interface";
import { Dispatch, SetStateAction } from "react";
import { io, Socket } from "socket.io-client";

export class ConnectM2 {
    public socket: Socket;

    constructor(m2: string, token: string) {
        this.socket = io(m2, {
            extraHeaders: {
                authorization: token // Vamos adicionar o token de autorização aqui
            }
        });
    }

    public initialize(updateRooms: Map<string, propsRoom[]> | undefined, setUpdateRooms:Dispatch<SetStateAction<Map<string, propsRoom[]>>>) {
        this.socket.on("connect", () => {
            console.log("Conectado com sucesso! ID do socket:", this.socket.id);
        });

        // Adicionando um ouvinte para o evento "disconnect"
        this.socket.on("disconnect", () => {
            console.log("Desconectado do servidor Socket.IO");
        });
        
        this.socket.on("updateAll", (el: {
            message: string, 
            content: any, 
            friendData: 
            {
                userSoul: string, 
                email: string, 
                customName: costumName 
            }
        }) => {
            console.log("aqui",el)
            if (el.message === "add_room" && typeof el.content === "string") {
                const newRooms: Map<string, propsRoom[]> = new Map<string, propsRoom[]>(updateRooms || []);

                // Cria uma nova sala de bate-papo com as informações do amigo
                const newRoom: propsRoom = {
                    userSoul: el.friendData.userSoul,
                    email: el.friendData.email,
                    custom_name: el.friendData.customName
                };

                // Adiciona a nova sala de bate-papo ao mapa
                if (newRooms.has(el.content)) {
                    newRooms.get(el.content)?.push(newRoom);
                } else {
                    newRooms.set(el.content, [newRoom]);
                }

                // Atualiza o estado com o novo mapa
                setUpdateRooms(newRooms);
                
                console.log("updateRooms", newRooms);
            }
        });
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
            /*this.socket.on("updateAll", (el: {message: string, content: any}) => {
                if (el.message === "add_room" && typeof el.content === "string") {
                    console.log(el.content)
                    resolve(el.content)   
                    this.socket.off("updateAll");              
                }
            });*/
            //resolve('ok')
            this.socket.on("connectFriendError", (error: any) => {
                reject(error);
                this.socket.off("connectFriendError");
            });
        });
    }
    


    public connectFriend(soulName: string){
        this.socket.emit("connectFriend", {soulName})
    }
    public sendMsg(soulName: string, message: string) {
        this.socket.emit("sendMsg", {soulName, message})
    }
    public newGroup(soulName: string){
        this.socket.emit("newGroup", {soulName})
    }
}

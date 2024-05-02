
import { DataUser } from "@/interfaces/searchByEmail.interface";
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

    public initialize() {
        this.socket.on("connect", () => {
            console.log("Conectado com sucesso! ID do socket:", this.socket.id);
        });

        // Adicionando um ouvinte para o evento "disconnect"
        this.socket.on("disconnect", () => {
            console.log("Desconectado do servidor Socket.IO");
        });
    }
    public searchUser(userDataMethod: string): Promise<DataUser>{
        return new Promise((resolve, reject) => {
            this.socket.emit("searchByEmail", { userDataMethod });
            this.socket.on("searchByEmail", (el: DataUser) => {
                resolve(el);
                // remove o listener após a resolução da promessa
                this.socket.off("searchByEmail");
            });
            this.socket.on("searchByEmailError", (error: any) => {
                reject(error);
                this.socket.off("searchByEmailError");
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

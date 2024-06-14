export interface DeleteGroupMsg {
    createdIn: string; 
    room: string; 
    deletedTo: "none" | "justTo" | "justFrom" | "all";
    fromUser: string;
    toUsers: string[]
}

export interface DeleteDuoMsg {
    createdIn: string; 
    room: string; 
    deletedTo: "none" | "justTo" | "justFrom" | "all";
    fromUser: string;
    toUser: string
}
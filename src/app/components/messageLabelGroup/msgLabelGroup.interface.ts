import { ConnectM2, DeletedToType } from "@/services/connectToM2.service";
import { propsMessagesGroupContent, propsRoom } from "../alpostelMain/alpostelMain";
import { Dispatch, SetStateAction } from "react";

export interface PropsGroupContent {
    _id?: string;
    fromUser: string;
    deletedTo: string;
    viewStatus: string;
    toUsers: string[];
    message: string;
    toGroup: string;
    createdIn:  string
}
export interface MsgLabelGroup {
    messageGroup: PropsGroupContent;
    groupAdress: string;
    createdTime: string;
    userSoul: string;
    serverIo: ConnectM2;
    setMessagesGroupContent: Dispatch<SetStateAction<Map<string, propsMessagesGroupContent[]>>>
    roomsListByUserSoul: Map<string, string>;
    participantsBgColor: Map<string, Map<string, string>>;
    groupName:string;
    participantsData: Map<string, propsRoom>;
    setMsgCreatedInDelete: Dispatch<SetStateAction<string[]>>;
    msgCreatedInDelete: string[];
    deletedToMSG: DeletedToType;
}
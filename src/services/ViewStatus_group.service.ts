import { Dispatch, SetStateAction } from 'react';
import { mapToString, stringToMap } from '../app/components/groupMsgs/groupMsgs';
import { propsMessagesGroupContent } from '@/app/components/alpostelMain/alpostelMain';
import { ConnectM2 } from './connectToM2.service';
export type ViewStatusMapSub = "onServer" | "delivered" | "seen" | "none"
export type ViewStatusMap = Map<string, ViewStatusMapSub>;
// Map<string,  "onServer" | "delivered" | "seen"> === string (viewStatus)
interface GenerateViewStatus {
    createdIn: string;
    toUsers: string[];
    viewStatus: string;
    setMessagesGroupContent: Dispatch<SetStateAction<Map<string, propsMessagesGroupContent[]>>>;
    userSoul: string;
    fromUser: string;
    room: string;
    serverIo: ConnectM2;
}
class ViewStatusGroup {
    public generateViewStatus({viewStatus, setMessagesGroupContent, userSoul, fromUser, room, serverIo,  toUsers, createdIn}: GenerateViewStatus){
        //console.log("previousViewStatus: ", viewStatus);
        //console.log("groupAdress (room): ", room)
        let viewStatusMap = stringToMap<string, ViewStatusMapSub>(viewStatus);
        let prevView = viewStatusMap.get(userSoul); 
        if(prevView) {
            if(prevView !== "seen") {
                viewStatusMap.set(userSoul, "seen");
                serverIo.msgSeenUpdate({createdIn, fromUser, room, toUsers, viewStatus: mapToString(viewStatusMap)}, true)
            }
        }
       
        /*setMessagesGroupContent((prev)=>{
            let newMsgValue = prev;


            return newMsgValue
        })*/
        //return {viewStatus: , viewStatusMap }
        //return
    }
   
}

let viewStatusGroup = new ViewStatusGroup();

export default viewStatusGroup;

/** 
 * if(messageGroup && messageGroup.viewStatus && !(messageGroup.viewStatus === "seen") && messageGroup.fromUser !== userSoul){

            const room = roomsListByUserSoul.get(soulName)
            if(room){
                serverIo.msgSeenUpdate({fromUser: message.fromUser, toUser: message.toUser, createdIn: message.createdIn, room, viewStatus: 'seen'})
            
                setMessagesGroupContent((previous) => {
                    const newMessages: Map <string, propsMessagesContent[]> = new Map<string, propsMessagesContent[]>(previous);
                    newMessages.forEach((value, key)=>{
                        if(key === message.fromUser){
                            const updatedMessages: propsMessagesContent[] = value.map((msg) => {
                                if (msg.createdIn === message.createdIn) {
                                    return { ...msg, viewStatus: 'seen' };
                                }
                                return msg;
                            });
            
                            newMessages.set(key, updatedMessages);
                        }
                    })
                    return newMessages
                });
            }
        }
 */
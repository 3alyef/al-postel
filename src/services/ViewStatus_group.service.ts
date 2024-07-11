import { Dispatch, SetStateAction } from 'react';
import { mapToString, stringToMap } from '../app/components/groupMsgs/groupMsgs';
import { propsMessagesGroupContent } from '@/app/components/alpostelMain/alpostelMain';
import { ConnectM2 } from './connectToM2.service';
export type ViewStatusMapSub = "onServer" | "delivered" | "seen" | "none";
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
        let viewStatusMap = stringToMap<string, ViewStatusMapSub>(viewStatus);
        let prevView = viewStatusMap.get(userSoul); 
        if(prevView) {
            if(prevView !== "seen") {
                viewStatusMap.set(userSoul, "seen");
                serverIo.msgSeenUpdate({createdIn, fromUser, room, toUsers, viewStatus: mapToString(viewStatusMap)}, true)
            }
        }
       
    }
   
}

let viewStatusGroup = new ViewStatusGroup();

export default viewStatusGroup;

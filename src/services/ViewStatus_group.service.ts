import { stringToMap } from '../app/components/groupMsgs/groupMsgs';
type ViewStatusMapSub = "delivered" | "seen"
export type ViewStatusMap = Map<string, ViewStatusMapSub>;
// Map<string,  "onServer" | "delivered" | "seen"> === string (viewStatus)
class ViewStatusGroup {
    public generateViewStatus(viewStatusString: string){
        let viewStatusMap = stringToMap<string, ViewStatusMapSub>(viewStatusString);
        

        return {viewStatus: , viewStatusMap }
    }

   
}

let viewStatusGroup = new ViewStatusGroup();

export default viewStatusGroup;
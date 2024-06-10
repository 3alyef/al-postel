"use client";

interface propsDeleteMsgScreen {
    functionContainer: (event: React.MouseEvent<HTMLDivElement>)=>void;
}
export default function DeleteMsgScreen({functionContainer}: propsDeleteMsgScreen) {
    
    return (
        <div className="w-full h-full left-0 absolute deleteMsgScreen" onClick={functionContainer}>
            <div className="optContainer">
                <p>
                    Delete
                </p>
            </div>
        </div>
    )
}
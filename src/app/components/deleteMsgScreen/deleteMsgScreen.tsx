"use client";

interface propsDeleteMsgScreen {
    functionContainer: (event: React.MouseEvent<HTMLDivElement>)=>void;
    msgCreatedIn: string;
}
export default function DeleteMsgScreen({functionContainer, msgCreatedIn}: propsDeleteMsgScreen) {
    
    return (
        <div className="w-full h-full left-0 absolute deleteMsgScreen " onClick={functionContainer}>
            <div className="optContainer">
                <p>
                    Delete
                </p>
                <p>
                    msgCreatedIn: {msgCreatedIn}
                </p>
            </div>
        </div>

    )
}
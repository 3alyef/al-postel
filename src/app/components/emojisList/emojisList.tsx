import { MdOutlineEmojiEmotions } from "react-icons/md"

interface propsEmojisList {
    costumWidth?: string
}

export default function EmojisList({costumWidth}: propsEmojisList){
    return (
        <div className="emojiBtn" style={{width: costumWidth || "52px"}}>
            <MdOutlineEmojiEmotions className="text-white w-[75%] h-[75%]"/>
        </div>
    )
}
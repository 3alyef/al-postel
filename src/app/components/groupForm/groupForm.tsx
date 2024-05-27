"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { MdOutlineEmojiEmotions } from "react-icons/md";
import InputText from "../inputText/inputText";
interface propsGroupForm {
    _isSemitic: boolean
}
export default function GroupForm({_isSemitic}: propsGroupForm) {
    const [imageGroup, setImageGroup] = useState<string>();
    const [groupName, setGroupName] = useState<string>('');
    const [imageFile, setImageFile] = useState<File>();
    const [onFocusSearchStyle, setOnFocusSearchStyle] = useState<boolean>(false);
    function onFocusSearchFunc() {
        setOnFocusSearchStyle(true);
    }
    const handleDivClick = () => {
        document.getElementById('fileInputGroup')?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setImageFile(file)
            
        }
    };

    useEffect(()=>{
        if (imageFile) {
            const imageUrl = URL.createObjectURL(imageFile);
            setImageGroup(imageUrl);
      
            return () => {
                URL.revokeObjectURL(imageUrl);
            };
        }
    }, [imageFile])
    return (
        <>
            <div className="groupForm">
                <div className="centralizeGroupForm">
                    <div className="groupImage" onClick={
                        ()=>{
                            handleDivClick();
                        }
                    }>
                        <Image src={imageGroup || '/imgs/logo.png?v=4'} alt="group image" fill/>
                    </div>
                    <div className="inputNameGroup">
                        <InputText _isRequired={true} _isSemitic={_isSemitic} messageError="" onFocusFunction={onFocusSearchFunc} onFocusStyle={onFocusSearchStyle} processErrorStyle={false} setOnFocusStyle={setOnFocusSearchStyle} setValue={setGroupName} text="Nome do grupo" type="text" value={groupName}/>
                        <div className="emojiBtn" style={{width: '40px'}}>
                            <MdOutlineEmojiEmotions className="text-white w-[75%] h-[75%]"/>
                        </div>
                    </div>
                    <input
                        type="file"
                        id="fileInputGroup"
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
            </div>
        </>
    )
}
"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import {MdPersonAddAlt1 } from "react-icons/md";
import InputText from "../inputText/inputText";
import EmojisList from "../emojisList/emojisList";
import { AiOutlineCheck } from "react-icons/ai";
import { GrLinkNext } from "react-icons/gr";
interface propsGroupForm {
    _isSemitic: boolean
}
export default function GroupForm({_isSemitic}: propsGroupForm) {
    const [imageGroup, setImageGroup] = useState<string>();
    const [groupName, setGroupName] = useState<string>('');
    const [imageFile, setImageFile] = useState<File>();
    const [onFocusSearchStyle, setOnFocusSearchStyle] = useState<boolean>(false);
    const [participantsValue, setParticipantsValue] = useState<number>(0);
    const [onAddContactsScreen, setOnAddContactsScreen] = useState<boolean>(false)
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
                    <div className="subHeaderGroupForm">
                        <div className="nameGroupForm">
                            <div className="groupImage" onClick={
                                ()=>{
                                    handleDivClick();
                                }
                            }>
                                <Image src={imageGroup || '/imgs/logo.png?v=4'} alt="group image" fill/>
                            </div>
                            <div className="inputNameGroup">
                                <InputText _isRequired={true} _isSemitic={_isSemitic} messageError="" onFocusFunction={onFocusSearchFunc} onFocusStyle={onFocusSearchStyle} processErrorStyle={false} setOnFocusStyle={setOnFocusSearchStyle} setValue={setGroupName} text="Nome do grupo" type="text" value={groupName} caretW={true}/>
                                <EmojisList costumWidth="50px" />
                            </div>
                            <input
                                type="file"
                                id="fileInputGroup"
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="groupOptKhv">
                            <h4 className="participantsNumber">
                                <span>Amigos:</span><span>{participantsValue}</span>
                            </h4>
                            <div className="participantsScreen">
                                <div className="personaIconGroup addPersonaIconGroup max-w-[50px]" onClick={()=>{
                                    if(!onAddContactsScreen){
                                        setOnAddContactsScreen(true)
                                    }
                                }}>
                                    <MdPersonAddAlt1 />
                                </div>
                        
                                <div className="personaIconGroup w-[50px]" onClick={()=>{
                                    console.log('remove participant')
                                }}>
                        
                                </div>
                                <div className="personaIconGroup w-[50px]" onClick={()=>{
                                    console.log('remove participant')
                                }}>
                        
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="createGroup">
                        <div className="createGroupBtn w-[50px] h-[50px]">
                            {onAddContactsScreen ? (
                                _isSemitic ? (
                                    <span>
                                        <GrLinkNext />
                                    </span>
                                    
                                ) : (
                                    <span style={{rotate: '90deg'}}>
                                        <GrLinkNext />
                                    </span>
                                )
                            ) : (
                                <AiOutlineCheck />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { MdPersonAddAlt1 } from "react-icons/md";
import InputText from "../inputText/inputText";
import EmojisList from "../emojisList/emojisList";
import { AiOutlineCheck } from "react-icons/ai";
import { GrLinkNext } from "react-icons/gr";
import PhotoIcon from "../photoIcon/photoIcon";
import { ContactsContainerDivLabel } from "../contactsContainerDiv/contactsContainerDivLabel";
import { roomsDataProps } from "../contactsContainer/contactsContainer";
import { propsRoom } from "../alpostelMain/alpostelMain";
import { ConnectM2 } from "@/services/connectToM2.service";
interface propsGroupForm {
    _isSemitic: boolean;
    roomsData: roomsDataProps[][];
    updateRooms: Map<string, propsRoom[]>;
    serverIo: ConnectM2;
}
export default function GroupForm({_isSemitic, roomsData, updateRooms, serverIo }: propsGroupForm) {
    const [imageGroup, setImageGroup] = useState<string>();
    const [groupName, setGroupName] = useState<string>('');
    const [imageFile, setImageFile] = useState<File>();
    const [onFocusSearchStyle, setOnFocusSearchStyle] = useState<boolean>(false);
    const [participantsValue, setParticipantsValue] = useState<number>(0);
    const [onAddContactsScreen, setOnAddContactsScreen] = useState<boolean>(false);
    const [participantsSoulNames, setParticipantsSoulNames] = useState<string[]>([]);
    const [roomsDataSelected, setRoomsDataSelected] = useState<roomsDataProps[][]>([]); 
  
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
    }, [imageFile]);

    async function addSoulToList(e: React.MouseEvent<HTMLDivElement, MouseEvent> ) {
        let soulNamePart = e.currentTarget.dataset.soulname;
        
        if(soulNamePart) {
            //console.log('soulNamePart', soulNamePart) 
            setParticipantsSoulNames((prev) => {
                let newValue = [...prev];
                //console.log('newValue', newValue);
                if (newValue.includes(soulNamePart)) {
                    newValue = newValue.filter(el => el !== soulNamePart);
                } else {
                    newValue.push(soulNamePart);
                }
                return newValue;
            });
        }
    }

    useEffect(()=>{
        //console.log('participantsSoulNames', participantsSoulNames);
        //console.log('updateRooms', updateRooms)
        setParticipantsValue(participantsSoulNames.length)
        const updateRoomsData = () => {
            const novasSalasData: roomsDataProps[][] = [];
            participantsSoulNames.forEach((sName)=>{
                const roomProps = updateRooms.get(sName);
                if(roomProps){
                    const salaArray = roomProps.map((propsSala, indice) => ({
                        soulName: propsSala.userSoul,
                        key: `${sName}-${indice}`,
                        sourceImage: propsSala.imageData?.userImage,
                        unreadMessages: 0,
                        customName: propsSala.costumName?.custom_name,
                        isGroup: false,
                        email: propsSala.email,
                        roomName: sName,
                        lastMsgData: '',
                        lastMSGContent: undefined,
                        whoLastSender: '',
                    }));
                    novasSalasData.push(salaArray);
                }
            })
            setRoomsDataSelected(novasSalasData)
            
        };

        //console.log('roomsDataSelected', roomsDataSelected)
        updateRoomsData();
    }, [participantsSoulNames]);
    function createGroupBtn() {
        if(onAddContactsScreen){
            if(onAddContactsScreen){
                setOnAddContactsScreen(false)
            }
        } else {
            serverIo.createNewGroup({groupImage: {image: imageFile, name: imageFile?.name, type: imageFile?.type}, groupName, groupParticipants: participantsSoulNames})
        }
    }
    function handlePhotoIcon(e: React.MouseEvent<HTMLDivElement, MouseEvent>){
        let soulNamePart = e.currentTarget.dataset.soulname;
        
        if(soulNamePart) {
            //console.log('soulNamePart', soulNamePart) 
            setParticipantsSoulNames((prev) => {
                let newValue = [...prev];
                //console.log('newValue', newValue);
                if (newValue.includes(soulNamePart)) {
                    newValue = newValue.filter(el => el !== soulNamePart);
                }
                return newValue;
            });
        }
    }
    return (
        <>
            <div className="groupForm groupFormRefer">
                <div className="centralizeGroupForm">
                    <div className="subHeaderGroupForm">
                        {
                            !onAddContactsScreen ? (
                                <>  
                                    <div className="nameGroupForm">
                                        <div className="groupImage" onClick={
                                            ()=>{
                                                handleDivClick();
                                            }
                                        }>
                                            <Image src={imageGroup || '/imgs/logo.png?v=4'} alt="group image" fill
                                            className="rounded-[100%]"/>
                                        </div>
                                        <div className="inputNameGroup">
                                            <InputText _isRequired={true} _isSemitic={_isSemitic} messageError="" onFocusFunction={onFocusSearchFunc} onFocusStyle={onFocusSearchStyle} processErrorStyle={false} setOnFocusStyle={setOnFocusSearchStyle} setValue={setGroupName} text="Nome do grupo" type="text" value={groupName} caretW={true}
                                            costumerClass="text-white"/>
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
                                            <div className=" addPersonaIconGroup max-w-[50px] w-[50px]" onClick={()=>{
                                                if(!onAddContactsScreen){
                                                    setOnAddContactsScreen(true)
                                                }
                                            }}>
                                                <MdPersonAddAlt1 />
                                            </div>
                                            {roomsDataSelected.flat().map(room => (
                                                <PhotoIcon key={room.soulName} sourceImage={room.sourceImage} userSoul={room.soulName} 
                                                onClick={handlePhotoIcon}/>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="contactsSelectedImagesRefer">
                                        <div className="contactsSelectedImages" style={participantsValue > 0 ? {padding: ".5em .95em"}: undefined}>
                                            {roomsDataSelected.flat().map(room => (
                                                <PhotoIcon key={room.soulName+room.roomName} sourceImage={room.sourceImage} 
                                                userSoul={room.soulName} 
                                                onClick={handlePhotoIcon}/>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="contactsListRefer">
                                        <div className="contactsListToSelect">
                                            {roomsData.flat().map((room) => {
                                                return(
                                                    <ContactsContainerDivLabel
                                                        soulName={room.soulName}
                                                        key={room.key}
                                                        sourceImage={room.sourceImage}
                                                        unreadMessages={room.unreadMessages}
                                                        _custom_name_contact={room.customName}
                                                        _isGroup={room.isGroup}
                                                        email={room.email}
                                                        onClick={(e)=>addSoulToList(e)}
                                                        roomName={room.roomName}
                                                        lastMsgData={room.lastMsgData}
                                                        lastMSGContent={room.lastMSGContent}
                                                        whoLastSender={room.whoLastSender}
                                                        type2={true}
                                                        isSelected={participantsSoulNames.includes(room.soulName)}
                                                        userSoul={""}
                                                    />
                                                )
                                            }
                                            
                                            )}
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                    <div className="createGroup">
                        <div className="createGroupBtn w-[50px] h-[50px]" onClick={createGroupBtn}>
                            {onAddContactsScreen ? (
                                !_isSemitic ? (
                                    <span>
                                        <GrLinkNext />
                                    </span>
                                ) : (
                                    <span style={{rotate: '180deg'}}>
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
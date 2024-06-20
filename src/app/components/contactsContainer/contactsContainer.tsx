"use client";
import { desactiveScreens } from "@/services/desactiveScreens.service";
import Image from "next/image";
import { CSSProperties, Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdGroups, MdOutlineGroupAdd, MdOutlineMessage, MdOutlinePhotoCamera } from "react-icons/md";
import { ContactsContainerDivLabel } from "../contactsContainerDiv/contactsContainerDivLabel";
import { SearchUser } from "../searchUser/searchUser";
import { ConnectM2, DecodedData } from "@/services/connectToM2.service";
import { propsMessagesContent, propsRoom } from "../alpostelMain/alpostelMain";
import OptionsSwitch from "../optionsSwitch/optionsSwitch";
import { LuPen } from "react-icons/lu";
import { SlPicture } from "react-icons/sl";
import { RiDeleteBin6Line } from "react-icons/ri";
import { propsGroups } from "@/interfaces/groups.interface";
import { MdPersonAddAlt1 } from "react-icons/md";
import GroupForm from "../groupForm/groupForm";
interface propsContactsContainer {
    _isSemitic: boolean;
    serverIo: ConnectM2;
    updateRooms: Map<string, propsRoom[]>;
    setUpdateRooms: Dispatch<SetStateAction<Map<string, propsRoom[]>>>;
    userSoul: string;
    setScreenMsg: Dispatch<SetStateAction<Map<string, propsRoom>>>
    setSoulNameNow: Dispatch<SetStateAction<string>>;
    userProps: DecodedData | undefined;
    messagesContent: Map<string, propsMessagesContent[]>;
    groupsDataById: Map<string, propsGroups>;
    setScreenMsgGroup: Dispatch<SetStateAction<Map<string, propsGroups>>>;
    setIsGroup: Dispatch<SetStateAction<boolean>>
}
export interface roomsDataProps {
    soulName: string; 
    key: string; 
    sourceImage: string | undefined; 
    unreadMessages: number; 
    customName: string | undefined; 
    isGroup: boolean; 
    email: string | undefined; 
    roomName: string; 
    lastMsgData: string | undefined; 
    lastMSGContent: string | undefined; 
    whoLastSender: string | undefined;
}

export interface propsDataGroups extends propsGroups {
    key: string;
}
export default function ContactsContainer({_isSemitic, serverIo, updateRooms, setUpdateRooms, userSoul, setScreenMsg, setSoulNameNow, userProps, messagesContent, groupsDataById, setScreenMsgGroup, setIsGroup}:propsContactsContainer){
    const [meImg, setImg] = useState<string>("/imgs/assets/person.png");
    const [settings, setSettings] = useState<boolean>(false);
    const [onProfile, setOnProfile] = useState<boolean>(false);
    const [onAlPostelLogo, setOnAlPostelLogo] = useState<boolean>(false);
    const [onGroups, setOnGroups] = useState<boolean>(false);
    const [onMessages, setOnMessages] = useState<boolean>(true);
    const [userSettingsProfile, setUserSettingsProfile] = useState<boolean>(false);
    const [imageFull, setImageFull] = useState<boolean>(false);
    const [roomsData, setRoomsData] = useState<roomsDataProps[][]>([]);
    const [groupsData, setGroupsData] = useState<propsDataGroups[]>([])
    const [changePhotoOptions, setChangePhotoOptions] = useState<boolean>(false);
    const [imageFile, setImageFile] = useState<File>();
    const [addGroupIcon, setAddGroupIcon] = useState<boolean>(false);
    const [addPersonaIcon, setAddPersonaIcon] = useState<boolean>(true)
    useEffect(()=>{
        if(userProps && userSoul && userProps.userSoul === userSoul){
            //console.log('userProps.imageProps', userProps.imageProps)
            if(userProps.imageProps){
                setImg(userProps.imageProps.userImage)
            }
        }

    }, [userProps])
    async function showMessages(e: React.MouseEvent<HTMLDivElement, MouseEvent>, soulNameC?:string, roomPropsC?:propsRoom, type2?: boolean ) {
        //console.log('soulNameC', soulNameC);

        let soulName: string | undefined;
        let roomProps: propsRoom[] | undefined = [];
        let groupProps:  propsGroups | undefined;
        if(type2){
            setIsGroup(true)
            soulName = e.currentTarget.dataset.soulname; 
            groupProps = Array.from(groupsDataById).find(([key, propsGroup]) => key === soulName)?.[1];
            
        } else {
            setIsGroup(false)
            if(!soulNameC || !roomPropsC ){
                soulName = e.currentTarget.dataset.soulname; 
                roomProps = Array.from(updateRooms).find(([key, propsRoomArray]) => key === soulName)?.[1];
            } else { 
                soulName = soulNameC;
                roomProps.push(roomPropsC);
            };
            //console.log('roomProps', roomProps)
            if(roomProps && soulName){
                const roomMap: Map<string, propsRoom> = new Map();
                roomMap.set(soulName, roomProps[0])
                setScreenMsg(roomMap)  
            }
        }
        //console.log('soulName', soulName)
        setSoulNameNow(soulName ? soulName : '');
        if(groupProps && soulName){
            const roomMap: Map<string, propsGroups> = new Map();
            roomMap.set(soulName, groupProps)
            setScreenMsgGroup(roomMap)  
        }
        
       
    }

    const onProfilePhotoStyle: CSSProperties = {
        width: "7.5em"
    }

    const imageFullStyle: CSSProperties = {
        width: "100%",
        padding: 0,
        aspectRatio: "1/.85"
    }
    const imageFullMain: CSSProperties = {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    
    
    useEffect(() => {

        const updateRoomsData = () => {
            const newRoomsData = Array.from(updateRooms).map(([key, propsRoomArray]) =>
                propsRoomArray.map((propsRoom, index) => {
                    const messages = messagesContent.get(propsRoom.userSoul);

                    let lastUpdate;
                    let unreadMsgs = 0;
                    let lastMSGContent;
                    let whoLastSender;

                    if (messages) {
                        const lastMsg = messages[messages.length - 1];
                        if (lastMsg && lastMsg.createdIn) {
                            const now = new Date();
                            const msgDate = new Date(lastMsg.createdIn);
                            const day = msgDate.getDate().toString().padStart(2, '0');
                            const month = (msgDate.getMonth() + 1).toString().padStart(2, '0');
                            const year = msgDate.getFullYear();

                            const isSameDay = now.toDateString() === msgDate.toDateString();
                            const isYesterday = now.getDate() - msgDate.getDate() === 1 && now.getMonth() === msgDate.getMonth() && now.getFullYear() === msgDate.getFullYear();

                            if (isSameDay) {
                                const hours = msgDate.getHours().toString().padStart(2, '0');
                                const minutes = msgDate.getMinutes().toString().padStart(2, '0');
                                lastUpdate = `${hours}:${minutes}`;
                            } else if (isYesterday) {
                                lastUpdate = "ontem";
                            } else {
                                lastUpdate = `${day}.${month}.${year}`;
                            }
                        }
                        lastMSGContent = lastMsg.message;
                        if (lastMsg.fromUser === userSoul) {
                            //whoLastSender = "you";
                        }
                        messages.forEach((el) => {
                            if (el.viewStatus
                                && el.fromUser !== userSoul && el.viewStatus !== "seen") {
                                unreadMsgs++;
                            }
                        });
                    }

                    return {
                        soulName: propsRoom.userSoul,
                        key: key + "-" + index,
                        sourceImage: propsRoom.imageData?.userImage,
                        unreadMessages: unreadMsgs,
                        customName: propsRoom.costumName?.custom_name,
                        isGroup: false,
                        email: propsRoom.email,
                        roomName: key,
                        lastMsgData: lastUpdate,
                        lastMSGContent: lastMSGContent,
                        whoLastSender: whoLastSender,
                    };
                })
            );

            setRoomsData(newRoomsData);
        };

        
        updateRoomsData();
    }, [updateRooms, messagesContent, userSoul]);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            
            if (changePhotoOptions && !target.closest('.changePhotoOptionsContent')) {
                setChangePhotoOptions(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [changePhotoOptions]);

    const handleDivClick = () => {
        document.getElementById('fileInput')?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setImageFile(file)
            
        }
    };

    useEffect(()=>{
        //console.log('imageFile: ', imageFile)
        if(imageFile){
            serverIo.setProfileImage(imageFile)
        }
    }, [imageFile]);

    useEffect(()=>{
        //console.log('groupsDataById', groupsDataById);
        const updateGroupsData = () => {
            const updateGroupsData: propsDataGroups[] = Array.from(groupsDataById).map(([key, propsRoom]) =>{
                let unreadMsgs = 0;
                return {
                    userSoul: propsRoom.userSoul,
                    key,
                    unreadMessages: unreadMsgs,
                    groupAdministratorParticipants: propsRoom.groupAdministratorParticipants,
                    groupName: propsRoom.groupName,
                    groupParticipants: propsRoom.groupParticipants,
                    imageData: propsRoom.imageData
                };
            }
            );

            setGroupsData(updateGroupsData);
        };
        updateGroupsData();
    }, [groupsDataById, userSoul])
    return ( 
        <div className="flex flex-col h-full relative">
            <div className="contactsContainer flex flex-col h-full">
                <div className="headerBarContacts">
                    
                    <div className="settingsContacts">
                        <OptionsSwitch _isSemitic={_isSemitic} onClickSettings={()=>desactiveScreens(
                            {
                                root: settings, 
                                competitors: [onProfile, onAlPostelLogo, onGroups, onMessages],  
                                setCompetitors: [setOnProfile, setOnAlPostelLogo, setOnGroups, setOnMessages], 
                                setRoot: setSettings,
                                setOnMessages: setOnMessages
                            }
                        ) }/>
                    </div>
                    {onAlPostelLogo && (
                        <div className="personaGroupOpt">
                            <div className="addGroupIcon" onClick={()=>{
                                if(!addGroupIcon){
                                    setAddGroupIcon(true)
                                    setAddPersonaIcon(false)
                                }
                            }}>
                                <MdOutlineGroupAdd />
                            </div>
                            <div className="addPersonaIcon" onClick={()=>{
                                if(!addPersonaIcon){
                                    setAddPersonaIcon(true)
                                    setAddGroupIcon(false)
                                }
                            }}>
                                <MdPersonAddAlt1 />
                            </div>
                        </div>
                    )}
                    
                </div> 
                <div className="mainContacts">
                    <div className="contactsGroupsList">           
                        <div className="alPostelLogoScreen py-[.75em]"
                        style={{display: onAlPostelLogo ? "grid":"none"}}>
                            {addPersonaIcon && (
                                <SearchUser _isSemitic={_isSemitic} serverIo={serverIo} updateRooms={updateRooms} setUpdateRooms={setUpdateRooms} showMessages={showMessages}
                                desactiveSearchUser={()=>
                                    desactiveScreens(
                                    {
                                        root: onAlPostelLogo, 
                                        competitors: [onProfile, onGroups, onMessages, settings],  
                                        setCompetitors: [setOnProfile, setOnGroups, setOnMessages, setSettings], 
                                        setRoot:  setOnAlPostelLogo,
                                        setOnMessages: setOnMessages
                                    }
                                ) } costumAlign="alignCostum"/>
                            )}

                            {addGroupIcon && (
                                <>
                                    <GroupForm _isSemitic={_isSemitic}
                                    roomsData={roomsData} updateRooms={updateRooms} serverIo={serverIo}/>
                                
                                </>
                            )}
                        </div>
                        <div className="groupsScreen flex-col pt-[7px] gap-[2px] h-[98%]"
                        style={{display: onGroups ? "grid":"none"}}>
                            <div className="py-[.25em] fixed h-[72%] w-[56.25%] intermediateDivMsgs intermediateGroups">
                                {
                                    groupsData.map((room) => {
                                        //console.log('groupsScreen', room)
                                        return (
                                            <ContactsContainerDivLabel
                                            email="" onClick={(e)=>{showMessages(e, undefined, undefined, true)}}
                                            roomName={room.groupName} soulName={room.userSoul} sourceImage={room.imageData.userImage} unreadMessages={0} _custom_name_contact={room.groupName}
                                            key={room.key}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="flex-col messagesScreen pt-[7px] gap-[2px] h-[98%]" style={{display: onMessages ? "grid":"none"}}>
                            <div className="py-[.25em] fixed h-[72%] w-[56.25%] intermediateDivMsgs intermediateGroups">
                                {roomsData.flat().map(room => (
                                    <ContactsContainerDivLabel
                                        soulName={room.soulName}
                                        key={room.key}
                                        sourceImage={room.sourceImage}
                                        unreadMessages={room.unreadMessages}
                                        _custom_name_contact={room.customName}
                                        _isGroup={room.isGroup}
                                        email={room.email}
                                        onClick={showMessages}
                                        roomName={room.roomName}
                                        lastMsgData={room.lastMsgData}
                                        lastMSGContent={room.lastMSGContent}
                                        whoLastSender={room.whoLastSender}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="absolute bg-black top-[-100%] w-[100%] h-[100%]">{/*Para correcao de Cor*/}</div>

                    </div>
                </div>
                <div className="footerBarContacts">
                    <div className="msgsBtn" onClick={()=>{
                        desactiveScreens(
                            {
                                root: onMessages, 
                                competitors: [onProfile, onAlPostelLogo, onGroups, settings],  
                                setCompetitors: [setOnProfile, setOnAlPostelLogo, setOnGroups, setSettings], 
                                setRoot: setOnMessages,
                                setOnMessages: setOnMessages,
                                _isMsg:true
                            }
                        )  
                    }}>
                        <MdOutlineMessage className="text-white scale-[1.8]"/>
                    </div>
                    <div className="groupsBtn" onClick={()=>{
                        desactiveScreens(
                            {
                                root: onGroups, 
                                competitors: [onProfile, onAlPostelLogo, onMessages, settings],  
                                setCompetitors: [setOnProfile, setOnAlPostelLogo, setOnMessages, setSettings], 
                                setRoot: setOnGroups,
                                setOnMessages: setOnMessages
                            }
                        )  
                    }}>
                        <MdGroups className="text-white scale-[2]"/>
                    </div>
                    <div className="searchBtn w-[2.2em] aspect-[1/1] relative" onClick={()=>{
                        desactiveScreens(
                            {
                                root: onAlPostelLogo, 
                                competitors: [onProfile, onGroups, onMessages, settings],  
                                setCompetitors: [setOnProfile, setOnGroups, setOnMessages, setSettings], 
                                setRoot:  setOnAlPostelLogo,
                                setOnMessages: setOnMessages
                            }
                        ) 
                    }}>
                        <Image src="/imgs/logo.png" alt="search icon" fill className="scale-[.95]"/>
                    </div>
                </div>
            </div>
            <div className={`settingsScreen flex flex-col h-full absolute ${imageFull && 'settingsScreenBGBLK'}`}
            style={{...{ right: settings ? "0%" : "100%" }, zIndex: settings ? 50:-1}}>
                <header>
                    <div className="headerContainerCT">
                        
                        <div className="itermediateHeaderContainerCT_IN">
                            <div className="returnButtonGDRT" onClick={()=>{
                                if(userSettingsProfile){
                                    if(imageFull){
                                        setImageFull(false)
                                    }else {
                                        setUserSettingsProfile(false)
                                    }
                            
                                } else {
                                    desactiveScreens(
                                        {
                                            root: settings,
                                            competitors: [onProfile, onAlPostelLogo, onGroups, onMessages],
                                            setCompetitors: [setOnProfile, setOnAlPostelLogo, setOnGroups, setOnMessages],
                                            setRoot: setSettings,
                                            setOnMessages: setOnMessages
                                        })
                                }
                                }}>
                                {_isSemitic ? (
                                    <FaArrowRight />
                                ):
                                (
                                    <FaArrowLeft />
                                )}
                            
                            </div>
                            <h2 className="titleLabelGDRT">{userSettingsProfile ? (imageFull ? "Imagem de Perfil": "Profile" ):"Settings"}</h2>
                        </div>

                        {imageFull && (
                            <div className="editPhotoLuPen">
                                <LuPen />
                            </div>
                        )}
                    </div>
                </header>
                <main style={imageFull ? imageFullMain: undefined}>
                        <div className="userOptionsSettings">   
                            <div className={`intermediateOptionsSettings ${!userSettingsProfile &&'intermediateOptionsSettingsHAC'}`} onClick={()=> {
                                if(!userSettingsProfile){
                                    setUserSettingsProfile(true)
                                }
                                
                            }} style={imageFull ? {padding: 0} : undefined}>
                                <div className="imageProfileChangeItm" style={imageFull ? {width: "100%", padding: 0} : undefined} >
                                    <div className="profilePhotoMainContacts" style={userSettingsProfile ? (imageFull ? imageFullStyle :onProfilePhotoStyle ) : undefined}>
                                        <Image alt="me" src={meImg} fill style={imageFull ? {cursor: "default"} : {borderRadius: '100%'} }
                                        />
                                    </div>
                                    {userSettingsProfile ? (
                                    !imageFull && (
                                            <div className="changeProfileImageContainer" onClick={() => {
                                                if(userSettingsProfile){
                                                    setImageFull(true);
                                                }
                                                
                                            }}>
                                                <div className="changeProfileImage" style={imageFull ? imageFullStyle : undefined} onClick={(e)=>{
                                                    e.stopPropagation();
                                                    setChangePhotoOptions(true)
                                                }}>
                                                    <Image
                                                        alt="alpostel"
                                                        src={'/imgs/logo.png?v=4'}
                                                        fill
                                                        className="alpostelChangeProfileLogo"
                                                        
                                                    />
                                                    {/**<div className="matzlamahChangeProfilePhoto">
                                                        <MdOutlinePhotoCamera />
                                                    </div> */}
                                                    
                                                </div>
                                            </div>
                                        )
                                    ) : (
                                        <div className="nameAndMsgSTATUS">
                                            <h3>{userProps?.first_name || ''}</h3>
                                            {/*<p>Teste de mensagem de STATUS</p>*/}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                  
                        <div className="changePhotoOptions" style={changePhotoOptions ? {display: 'flex'} : {display: 'none'}}>
                            <div className="intermediatePhotoOpt">
                                <div className="changePhotoOptionsContent" style={changePhotoOptions ? {left: '0%'} : {left: '-35%'}}>
                                    <div className="headerPhotoOptions">
                                        <div className="alpostelContainer">
                                            <Image
                                                alt="alpostel"
                                                src={'/imgs/logo.png?v=4'}
                                                fill
                                                className="alpostelChangeProfileLogo"
                                            />
                                        </div>
                                    </div>
                                    <div className="centralizeOptions">
                                        <div className="photoOptions">
                                            {/** <div className="matzlamah optContainer">
                                                <div className="optionsContent" onClick={()=>{
                                                    console.log("CAMERA")
                                                    
                                                }}>
                                                    <MdOutlinePhotoCamera />
                                                </div>
                                                <label>
                                                    Camera
                                                </label>
                                                
                                            </div>*/}
                                            
                                            <div className="galery optContainer">
                                                <div className="optionsContent" onClick={()=>{
                                                    //console.log("Galery");
                                                    handleDivClick()
                                                }}>
                                                    <SlPicture />
                                                </div>
                                                <label>
                                                    Galery
                                                </label>
                                                <input
                                                    type="file"
                                                    id="fileInput"
                                                    style={{ display: 'none' }}
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="deletePhoto">
                                            <div className="optionsContent">
                                                <RiDeleteBin6Line />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>                
                </main>
            </div>
        </div>
    )
}
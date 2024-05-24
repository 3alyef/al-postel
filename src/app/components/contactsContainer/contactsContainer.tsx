"use client";
import { desactiveScreens } from "@/services/desactiveScreens.service";
import Image from "next/image";
import { CSSProperties, Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdGroups, MdOutlineMessage, MdOutlinePhotoCamera } from "react-icons/md";
import { ContactsContainerDivLabel } from "../contactsContainerDiv/contactsContainerDivLabel";
import { SearchUser } from "../searchUser/searchUser";
import { ConnectM2, DecodedData } from "@/services/connectToM2.service";
import { propsRoom } from "../alpostelMain/alpostelMain";
import OptionsSwitch from "../optionsSwitch/optionsSwitch";

interface propsContactsContainer {
    _isSemitic: boolean;
    serverIo: ConnectM2;
    updateRooms: Map<string, propsRoom[]>;
    setUpdateRooms: Dispatch<SetStateAction<Map<string, propsRoom[]>>>;
    userSoul: string;
    setScreenMsg: Dispatch<SetStateAction<Map<string, propsRoom>>>
    setSoulNameNow: Dispatch<SetStateAction<string>>;
    userProps: DecodedData[]
}

export default function ContactsContainer({_isSemitic, serverIo, updateRooms, setUpdateRooms, userSoul, setScreenMsg, setSoulNameNow, userProps}:propsContactsContainer){
    const [meImg, setImg] = useState<string>("/imgs/assets/person.png");
    const [settings, setSettings] = useState<boolean>(false);
    const [onProfile, setOnProfile] = useState<boolean>(false);
    const [onAlPostelLogo, setOnAlPostelLogo] = useState<boolean>(false);
    const [onGroups, setOnGroups] = useState<boolean>(false);
    const [onMessages, setOnMessages] = useState<boolean>(true);
    const [userSettingsProfile, setUserSettingsProfile] = useState<boolean>(false);
    const [imageFull, setImageFull] = useState<boolean>(false);
    useEffect(()=>{
        const meImage = localStorage.getItem("imagemUserToPreLogin")
        if(meImage) {
            setImg(meImage)
        }

    }, [])


    async function showMessages(e: React.MouseEvent<HTMLDivElement, MouseEvent>, soulNameC?:string, roomPropsC?:propsRoom ) {
        console.log('soulNameC', soulNameC);

        let soulName: string | undefined;
        let roomProps: propsRoom[] | undefined = [];
        if(!soulNameC || !roomPropsC ){
            soulName = e.currentTarget.dataset.soulname; 
            roomProps = Array.from(updateRooms).find(([key, propsRoomArray]) => key === soulName)?.[1];
        } else { 
            soulName = soulNameC;
            roomProps.push(roomPropsC);
        };
        setSoulNameNow(soulName ? soulName : '');
        
        console.log('roomProps', roomProps)
        if(roomProps && soulName){
            const roomMap: Map<string, propsRoom> = new Map();
            roomMap.set(soulName, roomProps[0])
            setScreenMsg(roomMap)  
        }
       
    }

    useEffect(()=>{
        console.log('userProps', userProps)
    }, [userProps])

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
    
    return ( 
        <div className="flex flex-col h-full relative">
            <div className="userScreen flex flex-col w-full h-full absolute bg-slate-100"
            style={{right: onProfile ? "0%": "150%", zIndex: onProfile ? 1:-1}}>

            </div>
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
                </div> 
                <div className="mainContacts">
                    <div className="contactsGroupsList">           
                        <div className="alPostelLogoScreen"
                        style={{top: onAlPostelLogo ? "0%":"-100%"}}>
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
                            ) }/>
                        </div>
                        <div className="groupsScreen"
                        style={{top: onGroups ? "0%":"-100%"}}>

                        </div>
                        <div className="flex flex-col messagesScreen pt-[7px] gap-[2px]"
                        style={{top: onMessages ? "0%":"-100%"}}>
 
                            {
                                // Iterar sobre os elementos em updateRooms e renderizar ContactsContainerDivLabel para cada um
                               
                                Array.from(updateRooms).map(([key, propsRoomArray]) =>
                                    propsRoomArray.map((propsRoom, index) => (
                                        <ContactsContainerDivLabel
                                            soulName={propsRoom.userSoul}
                                            key={key + "-" + index}
                                            sourceImage={propsRoom.imageData?.userImage}
                                            unreadMessages={0}
                                            _custom_name_contact={propsRoom.costumName?.custom_name} _isGroup={false} email={propsRoom.email} onClick={showMessages}
                                            roomName={key}
                                        />
                                    ))
                                )
                            }
                            
                            
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
            <div className="settingsScreen flex flex-col h-full absolute"
            style={{...{ right: settings ? "0%" : "100%" }, zIndex: settings ? 50:-1}}>
                <header>
                    <div className="headerContainerCT">
                        
                        <div className="returnButtonGDRT"onClick={()=>{
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
                                        <Image alt="me" src={meImg} fill style={!imageFull ? {borderRadius: '100%'} : undefined}
                                        onClick={() => setImageFull(true)}/>
                                    </div>
                                    {userSettingsProfile ? (
                                    !imageFull && (
                                            <div className="changeProfileImageContainer">
                                                <div className="changeProfileImage" style={imageFull ? imageFullStyle : undefined}>
                                                    <Image
                                                        alt="alpostel"
                                                        src={'/imgs/logo.png?v=4'}
                                                        fill
                                                        className="alpostelChangeProfileLogo"
                                                        
                                                    />
                                                    <div className="matzlamahChangeProfilePhoto">
                                                        <MdOutlinePhotoCamera />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    ) : (
                                        <div className="nameAndMsgSTATUS">
                                            <h3>{userProps[0]?.first_name || ''}</h3>
                                            <p>Teste de mensagem de STATUS</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                  
                    
                </main>
            </div>
        </div>
    )
}
"use client";
import { desactiveScreens } from "@/services/desactiveScreens.service";
import Image from "next/image";
import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from "react";

import { IoSettingsOutline } from "react-icons/io5";
import { MdGroups, MdOutlineMessage } from "react-icons/md";
import { ContactsContainerDivLabel } from "../contactsContainerDiv/contactsContainerDivLabel";
import { SearchUser } from "../searchUser/searchUser";
import { ConnectM2 } from "@/services/connectToM2.service";
import { propsRoom } from "../alpostelMain/alpostelMain";

interface propsContactsContainer {
    _isSemitic: boolean;
    serverIo: ConnectM2;
    updateRooms: Map<string, propsRoom[]>;
    setUpdateRooms: Dispatch<SetStateAction<Map<string, propsRoom[]>>>;
    userSoul: string;
    setScreenMsg: Dispatch<SetStateAction<Map<string, propsRoom>>>
    setSoulNameNow: Dispatch<SetStateAction<string>>
}

export default function ContactsContainer({_isSemitic, serverIo, updateRooms, setUpdateRooms, userSoul, setScreenMsg, setSoulNameNow}:propsContactsContainer){
    const [meImg, setImg] = useState<string>("/imgs/assets/person.png");
    const [settings, setSettings] = useState<boolean>(false);
    const [onProfile, setOnProfile] = useState<boolean>(false);
    const [onAlPostelLogo, setOnAlPostelLogo] = useState<boolean>(false);
    const [onGroups, setOnGroups] = useState<boolean>(false);
    const [onMessages, setOnMessages] = useState<boolean>(true);

    useEffect(()=>{
        const meImage = localStorage.getItem("imagemUserToPreLogin")
        if(meImage) {
            setImg(meImage)
        }
    }, [])


    async function showMessages(e: React.MouseEvent<HTMLDivElement, MouseEvent>, soulNameC?:string) {
        console.log('soulNameC', soulNameC);

        let soulName: string | undefined;

        if(!soulNameC ){
            soulName = e.currentTarget.dataset.soulname;
            if(soulName){
                setSoulNameNow(soulName);
            }
            
        } else {
            soulName = soulNameC;
            setSoulNameNow(soulNameC);
            
        };

        const roomProps = Array.from(updateRooms).find(([key, propsRoomArray]) => key === soulName)?.[1];
        if(roomProps && soulName){
            const roomMap: Map<string, propsRoom> = new Map();
            roomMap.set(soulName, roomProps[0])
            setScreenMsg(roomMap)  
        }
       
    }
    return ( 
        <div className="flex flex-col h-full relative">
            <div className="userScreen flex flex-col w-full h-full absolute bg-slate-100"
            style={{right: onProfile ? "0%": "150%", zIndex: onProfile ? 1:-1}}>

            </div>
            <div className="contactsContainer flex flex-col h-full">
                <div className="headerBarContacts">
                    <div className="profilePhotoMainContacts"
                    onClick={()=>{
                        desactiveScreens(
                            {
                                root: onProfile, 
                                competitors: [settings, onAlPostelLogo, onGroups, onMessages],  
                                setCompetitors: [setSettings, setOnAlPostelLogo, setOnGroups, setOnMessages], 
                                setRoot: setOnProfile,
                                setOnMessages: setOnMessages
                            }
                        )                                       
                    }}>
                        <Image alt="me" src={meImg} fill/>
                    </div>
                    <div className="settingsContacts"
                    style={{transform: settings ? "rotate(180deg)": "rotate(0deg)"}} onClick={()=>{
                        desactiveScreens(
                            {
                                root: settings, 
                                competitors: [onProfile, onAlPostelLogo, onGroups, onMessages],  
                                setCompetitors: [setOnProfile, setOnAlPostelLogo, setOnGroups, setOnMessages], 
                                setRoot: setSettings,
                                setOnMessages: setOnMessages
                            }
                        )  
                        }}>
                        <IoSettingsOutline className="text-[1.5em] text-white"/>
                    </div>
                </div> 
                <div className="mainContacts">
                    <div className="contactsGroupsList">           
                        <div className="alPostelLogoScreen"
                        style={{top: onAlPostelLogo ? "0%":"-100%"}}>
                            <SearchUser _isSemitic={_isSemitic} serverIo={serverIo} updateRooms={updateRooms} setUpdateRooms={setUpdateRooms} showMessages={showMessages}/>
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

                        <div className="absolute bg-black top-[-100%] w-[100%] h-[100%]">Para correcao de Cor</div>

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
            <div className="settingsScreen flex flex-col h-full absolute bg-slate-100"
            style={{...(_isSemitic 
                ? { right: settings ? "0%" : "100%" }
                : { left: settings ? "0%" : "100%" }
            ), zIndex: settings ? 50:-1}}>
    
            </div>
        </div>
    )
}
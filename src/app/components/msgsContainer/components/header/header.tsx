"use client";
import { desactiveScreens } from "@/services/desactiveScreens.service";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import OptionsSwitch from "../../../optionsSwitch/optionsSwitch";
import Image from "next/image";
import { propsRoom } from "../../../alpostelMain/alpostelMain";
import { propsGroups } from "@/interfaces/groups.interface";
interface PropsHeaderMsgShow {
    msgCreatedInDelete: string[];
    setSoulNameNow: Dispatch<SetStateAction<string>>;
    _isSemitic: boolean;
    setMsgCreatedInDelete: Dispatch<SetStateAction<string[]>>;
    deleteMsgScreen: boolean;
    setDeleteMsgScreen: Dispatch<SetStateAction<boolean>>;
    isOnlineFriend: boolean;
    screenProps: propsRoom | undefined;
    groupsScreenProps: propsGroups | undefined;
    friendIsTyping: boolean;
    groupsDataById: Map<string, propsGroups>;
    updateRooms: Map<string, propsRoom[]>;
    soulNameNow: string;
    isGroup: boolean
}

export default function HeaderMsgShow({msgCreatedInDelete, setSoulNameNow, _isSemitic, setMsgCreatedInDelete, deleteMsgScreen, setDeleteMsgScreen, isOnlineFriend, screenProps, groupsScreenProps, friendIsTyping, groupsDataById, updateRooms, soulNameNow, isGroup}: PropsHeaderMsgShow) {
    const [onProfile, setOnProfile] = useState<boolean>(false);
    const [menu, setMenu] = useState<boolean>(false);
    const [imageURL, setImageURL] = useState<string>();
    useEffect(()=>{
        if(isGroup){
            let groupData = groupsDataById.get(soulNameNow);
            if(groupData) {
                setImageURL(groupData.imageData.userImage)
            }
        } else {
            let roomData = updateRooms.get(soulNameNow);
            if(roomData) {
                setImageURL(roomData[0].imageData.userImage)
            }
        }
    }, [groupsScreenProps, screenProps, groupsDataById, updateRooms, soulNameNow])
    return (
        <div className="headerBarContacts headerBarMsgs py-[5px]">
            {msgCreatedInDelete.length > 0 ? (
                <div className="flex items-center justify-between w-[100%]">
                    <div className="flex justify-between items-center gap-[1em]">
                        <div className=" flex items-center cursor-pointer" onClick={()=>{
                            setMsgCreatedInDelete([])
                        }}>
                            <div className=" sectionDisplayOk text-white " >
                                {_isSemitic ? (
                                    <FaArrowRight />
                                ):
                                (
                                    <FaArrowLeft />
                                )}
                            </div>
                        </div>
                        <div>
                            <h1 className="text-white
                            font-[400] text-[19px]">
                                {msgCreatedInDelete.length}
                            </h1>
                        </div>
                    </div>
                    <div className="binMsgsBtn flex justify-center items-center">
                        <h2 className="binMsgs" onClick={()=>{
                            setDeleteMsgScreen(!deleteMsgScreen)
                        }}>
                            <RiDeleteBin6Line />
                        </h2>
                    </div>
                </div>
            ) : (
                <>
                    <div className=" flex items-center gap-[.5em] cursor-pointer" onClick={()=>{
                        setSoulNameNow('')
                    }}>
                        <div className=" sectionDisplayOk text-white " style={{display: 'none'}}>
                            {_isSemitic ? (
                                <FaArrowRight />
                            ):
                            (
                                <FaArrowLeft />      
                            )}
                        
                        </div>
                        
                        <div className="profilePhotoMainContacts"
                        onClick={()=>{
                            desactiveScreens(
                                {
                                    root: onProfile,
                                    competitors: [menu],
                                    setCompetitors: [setMenu],
                                    setRoot: setOnProfile,
                                    setOnMessages: setOnProfile
                                }
                            )
                        }}>
                            <Image alt="me" src={imageURL || "/imgs/assets/person.png"} fill/>
                        </div>
                        <div className="onlineAndTyping" style={{scale: isOnlineFriend ? '0.9' : '1'}}>
                            <span className="nameUserSpan">
                                {screenProps ? (screenProps.costumName.custom_name || screenProps.first_name):
                                (groupsScreenProps &&
                                groupsScreenProps.groupName)
                                }
                            </span>
                            {
                                !groupsScreenProps && (
                                    <span className="digOrOn">
                                    {isOnlineFriend ?           (friendIsTyping ?   'Digitando...' : 'Online') : false
                                    }
                                    </span>
                                ) 
                            }
                        </div>
                    </div>
                    <div className="settingsContacts">
                        <OptionsSwitch _isSemitic={_isSemitic} onClickSettings={()=>desactiveScreens(
                            {
                                root: menu, 
                                competitors: [onProfile],  
                                setCompetitors: [setOnProfile], 
                                setRoot: setMenu,
                                setOnMessages: setMenu
                            }
                        ) }/>
                    </div>
                </>
            )}
        </div>
    )
}
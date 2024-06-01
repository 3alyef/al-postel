"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
interface propsPhotoIcon {
    sourceImage: string | undefined;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    userSoul: string
}
export default function PhotoIcon({sourceImage, onClick, userSoul}:propsPhotoIcon){
    const [imageUser, setImageUser] = useState<string>('/imgs/assets/person.png');
    useEffect(()=>{
        if(sourceImage){
            setImageUser(sourceImage)
        }
        
    }, [sourceImage])
    return(
        <>
            <div className="personaIconGroup min-w-[50px] w-[50px]" onClick={onClick} data-userSoul={userSoul}>
                <Image src={imageUser} fill alt="user photo"/>
            </div>
        </>
    )
}
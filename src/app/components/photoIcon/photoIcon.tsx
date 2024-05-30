"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
interface propsPhotoIcon {
    sourceImage: string | undefined;
}
export default function PhotoIcon({sourceImage}:propsPhotoIcon){
    const [imageUser, setImageUser] = useState<string>('/imgs/assets/person.png');
    useEffect(()=>{
        if(sourceImage){
            setImageUser(sourceImage)
        }
        
    }, [sourceImage])
    return(
        <>
            <div className="personaIconGroup w-[50px]" onClick={()=>{
                console.log('remove participant')
            }}>
                <Image src={imageUser} fill alt="user photo"/>
            </div>
        </>
    )
}
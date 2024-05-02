export interface MessageUserResponse {
    found: boolean,
    dataUser: {userSoul: string | null, userImageData: imageResp}
    message: string 
}

export interface DataUser {
    userSoul: string | null;
    first_name: string;
    email: string;
    userImageData: imageResp;
    costumName: costumName
}


export interface costumName {
    custom_name: string | undefined;
    lastUpdateIn: string | undefined
}

export interface Message {
    found: boolean,
    userSoul: string | null, 
    message: string 
}

interface imageResp {
    userImage: string | null; 
    lastUpdateIn: string | null
}
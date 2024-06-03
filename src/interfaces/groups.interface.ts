export interface propsGroups {
    userSoul: string;
    imageData: {userImage: string | undefined, lastUpdateIn: string | undefined};
    groupName: string;
    groupParticipants: string[];
    groupAdministratorParticipants: string[];
}

export interface propsGroupsR {
    _id: string;
    imageData: {userImage: string | undefined, lastUpdateIn: string | undefined};
    groupName: string;
    groupParticipants: string[];
    groupAdministratorParticipants: string[];
}
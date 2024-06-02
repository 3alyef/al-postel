export interface propsGroups {
    _id: string;
    imageData: {userImage: string | undefined, lastUpdateIn: string | undefined};
    groupName: string;
    groupParticipants: string[];
    groupAdministratorParticipants: string[];
}
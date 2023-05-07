export type UserType = {
    "name": string
    "id": number
    "uniqueUrlName"?: null | string
    "photos": {
        "small": null | string
        "large": null | string
    },
    "status": null | string
    "followed": boolean
}

export type UsersTypeFromServer = { "items": Array<UserType> }

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>,
    data: D
    fieldsErrors: Array<any>
}

export type MeResponseDataType = {
    id: number
    login: string
    email: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    aboutMe: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    contacts: {
        github: string | null
        vk: string | null
        facebook: string | null
        instagram: string | null
        twitter: string | null
        website: string | null
        youtube: string | null
        mainLink: string | null
    }
    photos?: PhotosType
}
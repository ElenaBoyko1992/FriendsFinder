import {profileAPI, ProfileForUpdateType} from "../api/api";
import {AppThunkDispatch} from "./redux-store";

const ADD_POST = 'samurai-network/profile/ADD-POST';
const SET_USER_PROFILE = 'samurai-network/profile/SET-USER-PROFILE';
const SET_STATUS = 'samurai-network/profile/SET_STATUS';
const DELETE_POST = 'samurai-network/profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'samurai-network/SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesAmount: 5},
        {id: 2, message: 'Hi, its my first post', likesAmount: 11},
        {id: 3, message: 'Blabla', likesAmount: 11},
        {id: 4, message: 'Dada', likesAmount: 11},
    ],
    profile: null,
    status: ''
}

const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionsTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostsType = {
                id: 5,
                message: action.newPost,
                likesAmount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        }
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state;
    }

}

//AC
export const addPostActionCreator = (newPost: string) => ({type: ADD_POST, newPost}) as const

export const setUserProfile = (profile: ProfileType) => {

    return {
        type: SET_USER_PROFILE,
        profile
    } as const
}
export const setStatus = (status: string) => {
    return {
        type: SET_STATUS,
        status
    } as const
}
export const deletePost = (postId: number) => {
    return {type: DELETE_POST, postId} as const
}
export const savePhotoSuccess = (photos: any) => {
    return {type: SAVE_PHOTO_SUCCESS, photos} as const
}


//thunks
export const getUserProfile = (userId: string) => async (dispatch: AppThunkDispatch) => {
    let response = await profileAPI.getUserProfileData(userId)

    dispatch(setUserProfile(response.data))
}

export const getStatus = (userId: string) => async (dispatch: AppThunkDispatch) => {
    let res = await profileAPI.getStatus(userId)

    dispatch(setStatus(res.data))
}
export const updateStatus = (status: string) => async (dispatch: AppThunkDispatch) => {
    let res = await profileAPI.updateStatus(status)

    if (res.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const savePhoto = (file: any) => async (dispatch: AppThunkDispatch) => {
    let res = await profileAPI.savePhoto(file)

    if (res.data.resultCode === 0) {
        dispatch(savePhotoSuccess(res.data.data.photos))
    }
}
export const saveProfile = (profile: ProfileForUpdateType) => async (dispatch: AppThunkDispatch) => {
    let res = await profileAPI.saveProfile(profile)
if (res.data.resultCode===0){

}

}

//types
type PostsType = {
    id: number
    message: string
    likesAmount: number
}
export type ProfileType = {
    aboutMe?: string
    contacts?: any
    fullName?: string
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    userId?: number
    photos?: any
}
export type ProfilePageType = {
    posts: Array<PostsType>
    profile?: null | ProfileType
    status: string
}

export type ProfileActionsTypes =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof savePhotoSuccess>

export default profileReducer;
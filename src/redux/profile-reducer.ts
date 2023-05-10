import {profileAPI} from "api/api";
import {AppThunkDispatch, ReduxStoreType} from "./redux-store";
import {stopSubmit} from "redux-form";
import {ProfileType} from "api/types";

const ADD_POST = 'samurai-network/profile/ADD-POST';
const SET_USER_PROFILE = 'samurai-network/profile/SET-USER-PROFILE';
const SET_STATUS = 'samurai-network/profile/SET_STATUS';
const DELETE_POST = 'samurai-network/profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'samurai-network/SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, its my first post', likesAmount: 5},
        {id: 2, message: 'Hi, how are you?', likesAmount: 11},
        {id: 3, message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis ipsam, quo. Adipisci, dignissimos, quia? Assumenda consectetur quia rerum unde veniam? Aliquid cum doloribus esse eum ipsam itaque rem sapiente voluptas!', likesAmount: 11},
        {id: 4, message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consectetur delectus dignissimos, dolorum ea earum id illum inventore laborum modi neque odio quasi, quia repellat similique tempora voluptatibus. Totam, vero.', likesAmount: 10},
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
                profile: {...state.profile, photos: action.photos} as ProfileType
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
export const getUserProfile = (userId: number) => async (dispatch: AppThunkDispatch) => {
    try {
        let response = await profileAPI.getUserProfileData(userId)
        dispatch(setUserProfile(response.data))
    } catch (error: any) {
        alert(error.message ? error.message : 'Some error occurred')
    }
}

export const getStatus = (userId: number) => async (dispatch: AppThunkDispatch) => {
    try {
        let res = await profileAPI.getStatus(userId)
        dispatch(setStatus(res.data))
    } catch (error: any) {
        alert(error.message ? error.message : 'Some error occurred')
    }

}
export const updateStatus = (status: string) => async (dispatch: AppThunkDispatch) => {
    try {
        let res = await profileAPI.updateStatus(status)
        if (res.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (error: any) {
        alert(error.message ? error.message : 'Some error occurred')
    }
}
export const savePhoto = (file: any) => async (dispatch: AppThunkDispatch) => {
    try {
        let res = await profileAPI.savePhoto(file)
        if (res.data.resultCode === 0) {
            dispatch(savePhotoSuccess(res.data.data.photos))
        }
    } catch (error: any) {
        alert(error.message ? error.message : 'Some error occurred')
    }
}
export const saveProfile = (profile: ProfileType) => async (dispatch: AppThunkDispatch, getState: () => ReduxStoreType) => {
    const userId = getState().auth.userId;
    try {
        let res = await profileAPI.saveProfile(profile)
        if (res.data.resultCode === 0) {
            if (userId) {
                dispatch(getUserProfile(userId))
            }
        } else {
            dispatch(stopSubmit('edit-profile', {_error: res.data.messages[0]}))
            return Promise.reject(res.data.messages[0])
        }
    } catch (error: any) {
        alert(error.message ? error.message : 'Some error occurred')
    }
}

//types
type PostsType = {
    id: number
    message: string
    likesAmount: number
}

export type ProfilePageType = {
    posts: Array<PostsType>
    profile: ProfileType | null
    status: string
}

export type ProfileActionsTypes =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof savePhotoSuccess>

export default profileReducer;
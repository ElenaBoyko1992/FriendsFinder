import {profileAPI, usersAPI} from "../api/api";
import {AppThunkDispatch} from "./redux-store";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesAmount: 5},
        {id: 2, message: 'Hi, its my first post', likesAmount: 11},
        {id: 2, message: 'Blabla', likesAmount: 11},
        {id: 2, message: 'Dada', likesAmount: 11},
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

//thunks
export const getUserProfile = (userId: string) =>  (dispatch: AppThunkDispatch) => {
        profileAPI.getUserProfileData(userId)
            .then(response => {
                dispatch(setUserProfile(response.data))
            })
}

export const getStatus = (userId: string) =>  (dispatch: AppThunkDispatch) => {
        profileAPI.getStatus(userId)
            .then(res => dispatch(setStatus(res.data)))

}
export const updateStatus = (status: string) =>  (dispatch: AppThunkDispatch) => {
        profileAPI.updateStatus(status)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
            })
}

//types
type PostsType = {
    id: number
    message: string
    likesAmount: number
}
export type ProfileType = {
    aboutMe: string
    contacts: any
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: any
    userId: number
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

export default profileReducer;
import {profileAPI, usersAPI} from "../api/api";
import {setTotalUsersCount, setUsers, toggleIsFetching} from "./users-reducer";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';

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
    newPostText: string
    profile?: null | ProfileType
}

export type ActionsTypes =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof updateNewPostTextActionCreator>
    | ReturnType<typeof setUserProfile>

type DispatchType = (action: ActionsTypes) => void

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesAmount: 5},
        {id: 2, message: 'Hi, its my first post', likesAmount: 11},
        {id: 2, message: 'Blabla', likesAmount: 11},
        {id: 2, message: 'Dada', likesAmount: 11},
    ],
    newPostText: 'it-kamasutra.com',
    profile: null
}

const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostsType = {
                id: 5,
                message: state.newPostText,
                likesAmount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case UPDATE_NEW_POST_TEXT:
            //здесь глубокую копию posts можно не делать, т.к. здесь посты мы не меняем
            return {
                ...state,
                newPostText: action.newText
            };
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        default:
            return state;
    }

}

export const addPostActionCreator = () => ({type: ADD_POST}) as const
export const updateNewPostTextActionCreator = (text: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    } as const
}
export const setUserProfile = (profile: ProfileType) => {

    return {
        type: SET_USER_PROFILE,
        profile
    } as const
}

export const getUserProfileDataTh = (userId: string) => {
    return (dispatch: DispatchType) => {
        profileAPI.getUserProfileData(userId)
            .then(response => {
                dispatch(setUserProfile(response.data))
            })
    }
}

export default profileReducer;
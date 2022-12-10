import {authAPI} from "../api/api";


const SET_USER_DATA = 'SET_USER_DATA';
const SET_USER_AVATAR = 'SET_USER_AVATAR';

export type authReducerType = {
    userId: null | string
    email: null | string
    login: null | string
    isAuth: boolean
    userAvatar: null | string
}

export type ActionsTypes =
    ReturnType<typeof setAuthUserData>
    | ReturnType<typeof setUserAvatar>

type DispatchType = (action: ActionsTypes) => void

let initialState: authReducerType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    userAvatar: null
}

const authReducer = (state = initialState, action: ActionsTypes): authReducerType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        case SET_USER_AVATAR:
            return {
                ...state,
                userAvatar: action.srcAddress
            }
        default:
            return state;

    }
}

export const setAuthUserData = (userId: string, email: string, login: string) => ({
    type: SET_USER_DATA,
    data: {userId, email, login}
}) as const
export const setUserAvatar = (srcAddress: string) => ({
    type: SET_USER_AVATAR,
    srcAddress
}) as const

export const checkAuthTh = () => {

    return (dispatch: DispatchType) => {
        authAPI.checkAuth()
            .then((data: any) => {
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data
                    dispatch(setAuthUserData(id, email, login))
                    authAPI.getMyProfileData(id)
                        .then(data => {
                            dispatch(setUserAvatar(data.photos.small))
                        })
                }
            })
    }
}

export default authReducer;
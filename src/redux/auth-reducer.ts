import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {Dispatch} from "redux";


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
                ...action.payload
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

export const setAuthUserData = (userId: string | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
}) as const
export const setUserAvatar = (srcAddress: string) => ({
    type: SET_USER_AVATAR,
    srcAddress
}) as const

export const getAuthUserData = () => {

    return (dispatch: Dispatch) => {
       return authAPI.me()
            .then((data: any) => {
                if (data.resultCode === 0) {
                    let {email, id, login} = data.data
                    console.log(email)
                    dispatch(setAuthUserData(id, email, login, true))
                    /*                    authAPI.getMyProfileData(data.data.id)
                                            .then(data => {
                                                debugger
                                                dispatch(setUserAvatar(data.photos.small))
                                            })*/
                }
            })
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => {

    return (dispatch: any) => {
        authAPI.login(email, password, rememberMe)
            .then((data: any) => {
                if (data.resultCode === 0) {
                    dispatch(getAuthUserData())
                } else {
                    let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
                    dispatch(stopSubmit('login', {_error: message}))
                }
            })
    }
}

export const logout = () => {

    return (dispatch: any) => {
        authAPI.logout()
            .then((data: any) => {
                if (data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false))

                }
            })
    }
}

export default authReducer;
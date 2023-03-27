import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {AppThunkDispatch} from "./redux-store";


const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const SET_USER_AVATAR = 'samurai-network/auth/SET_USER_AVATAR';

let initialState: authReducerType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    userAvatar: null
}

const authReducer = (state = initialState, action: AuthActionsTypes): authReducerType => {
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

//AC
export const setAuthUserData = (userId: string | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
}) as const
export const setUserAvatar = (srcAddress: string) => ({
    type: SET_USER_AVATAR,
    srcAddress
}) as const

//thunks
export const getAuthUserData = () => async (dispatch: AppThunkDispatch) => {
    let data = await authAPI.me()
    if (data.resultCode === 0) {
        let {email, id, login} = data.data
        console.log(email)
        dispatch(setAuthUserData(id, email, login, true))
    }

}

export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: AppThunkDispatch) => {
    let data = await authAPI.login(email, password, rememberMe)

    if (data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = () => async (dispatch: AppThunkDispatch) => {
    let data = await authAPI.logout()

    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

//types
export type authReducerType = {
    userId: null | string
    email: null | string
    login: null | string
    isAuth: boolean
    userAvatar: null | string
}

export type AuthActionsTypes =
    ReturnType<typeof setAuthUserData>
    | ReturnType<typeof setUserAvatar>

export default authReducer;
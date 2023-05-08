import {authAPI, securityAPI} from "api/api";
import {stopSubmit} from "redux-form";
import {AppThunkDispatch} from "./redux-store";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const SET_USER_AVATAR = 'samurai-network/auth/SET_USER_AVATAR';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    userAvatar: null,
    captchaUrl: null
}

const authReducer = (state: authReducerType = initialState, action: AuthActionsTypes): authReducerType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
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
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
}) as const
export const setUserAvatar = (srcAddress: string) => ({
    type: SET_USER_AVATAR,
    srcAddress
}) as const
export const getCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
}) as const

//thunks
export const getAuthUserData = () => async (dispatch: AppThunkDispatch) => {
    try {
        let data = await authAPI.me()
        if (data.resultCode === 0) {
            let {email, id, login} = data.data
            dispatch(setAuthUserData(id, email, login, true))
        }
    } catch (error: any) {
        alert(error.message ? error.message : 'Some error occurred')
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null) => async (dispatch: AppThunkDispatch) => {
    try {
        let data = await authAPI.login(email, password, rememberMe, captcha)

        if (data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
            dispatch(stopSubmit('login', {_error: message}))
        }
    } catch (error: any) {
        alert(error.message ? error.message : 'Some error occurred')
    }
}

export const getCaptchaUrl = () => async (dispatch: AppThunkDispatch) => {
    try {
        const res = await securityAPI.getCaptchaUrl()
        const url = res.data.url
        dispatch(getCaptchaUrlSuccess(url))
    } catch (error: any) {
        alert(error.message ? error.message : 'Some error occurred')
    }

}

export const logout = () => async (dispatch: AppThunkDispatch) => {
    try {
        let data = await authAPI.logout()
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    } catch (error: any) {
        alert(error.message ? error.message : 'Some error occurred')
    }

}

//types
export type authReducerType = {
    userId: null | number
    email: null | string
    login: null | string
    isAuth: boolean
    userAvatar: null | string
    captchaUrl: string | null
}

export type AuthActionsTypes =
    ReturnType<typeof setAuthUserData>
    | ReturnType<typeof setUserAvatar>
    | ReturnType<typeof getCaptchaUrlSuccess>

export default authReducer;
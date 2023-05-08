import {getAuthUserData} from "./auth-reducer";
import {AppThunkDispatch} from "./redux-store";


const INITIALIZED_SUCCESS = 'samurai-network/app/INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
}

const appReducer = (state: appReducerType = initialState, action: AppActionsTypes): appReducerType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;

    }
}

//AC
export const initializedSuccess = () => ({
    type: INITIALIZED_SUCCESS,
}) as const

//thunks
export const initializeApp = () => async (dispatch: AppThunkDispatch) => {
    try {
        await dispatch(getAuthUserData())
        dispatch(initializedSuccess())
    } catch (error: any) {
        alert(error.message ? error.message : 'Some error occurred')
    }

}

//types
export type appReducerType = {
    initialized: boolean
}
export type AppActionsTypes =
    ReturnType<typeof initializedSuccess>

export default appReducer;
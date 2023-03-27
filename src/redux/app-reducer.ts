import {getAuthUserData} from "./auth-reducer";
import {AppThunkDispatch} from "./redux-store";

const INITIALIZED_SUCCESS = 'samurai-network/app/INITIALIZED_SUCCESS';

let initialState: appReducerType = {
    initialized: false
}

const appReducer = (state = initialState, action: AppActionsTypes): appReducerType => {
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
    const res = await dispatch(getAuthUserData())
    dispatch(initializedSuccess())
}

//types
export type appReducerType = {
    initialized: boolean
}
export type AppActionsTypes =
    ReturnType<typeof initializedSuccess>


export default appReducer;
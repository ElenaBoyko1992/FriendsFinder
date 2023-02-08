import {Dispatch} from "redux";
import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState: appReducerType = {
    initialized: false
}

const appReducer = (state = initialState, action: ActionsTypes): appReducerType => {
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
export const initializeApp = () => (dispatch: any) => {
    dispatch(getAuthUserData())
        .then(()=>{
            dispatch(initializedSuccess())
        })

}

//types
export type appReducerType = {
    initialized: boolean
}
export type ActionsTypes =
    ReturnType<typeof initializedSuccess>


export default appReducer;
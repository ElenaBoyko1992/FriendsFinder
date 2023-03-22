import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer, {ProfileActionsTypes} from "./profile-reducer";
import dialogsReduser, {DialogsActionsTypes} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, {UsersActionsTypes} from "./users-reducer";
import authReducer, {AuthActionsTypes} from "./auth-reducer";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import appReducer, {AppActionsTypes} from "./app-reducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReduser,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type ReduxStoreType = ReturnType<typeof rootReducer>

// создаем тип диспатча который принимает как AC так и TC
export type AppThunkDispatch = ThunkDispatch<ReduxStoreType, any, AppActionsType>

//все типы экшенов для всего app
export type AppActionsType =
    AppActionsTypes
    | AuthActionsTypes
    | ProfileActionsTypes
    | UsersActionsTypes
    | DialogsActionsTypes

export default store;

// @ts-ignore
window.store = store
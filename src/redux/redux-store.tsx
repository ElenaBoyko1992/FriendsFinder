import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReduser from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReduser,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
})

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type ReduxStoreType = ReturnType<typeof rootReducer>

export default store;

// @ts-ignore
window.store = store
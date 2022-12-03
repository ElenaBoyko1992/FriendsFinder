import {combineReducers, createStore} from "redux";
import profileReducer, {
    addPostActionCreator, setUserProfile,
    updateNewPostTextActionCreator
} from "./profile-reducer";
import dialogsReduser, {sendMessageCreator, updateNewMessageBodyCreator} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, {
    follow,
    setCurrentPage,
    setUsers,
    setTotalUsersCount, toggleIsFetching,
    unfollow
} from "./users-reducer";
import authReducer from "./auth-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReduser,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer
})

let store = createStore(rootReducer);

export type ReduxStoreType = ReturnType<typeof rootReducer>

export default store;

// @ts-ignore
window.store = store
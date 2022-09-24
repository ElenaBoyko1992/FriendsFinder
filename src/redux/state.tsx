import {PostsType} from "../components/Profile/MyPosts/MyPosts";
import {DialogsPageType, MessagesType} from "../components/Dialogs/Dialogs";
import {ProfilePageType} from "../components/Profile/Profile";

export type RootStateType = {
    dialogsPage: DialogsPageType
    profilePage: ProfilePageType
}

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let store = {
    _state: {
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrey'},
                {id: 3, name: 'Sveta'},
                {id: 4, name: 'Sasha'},
                {id: 5, name: 'Viktor'},
                {id: 6, name: 'Valera'},
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How are you?'},
                {id: 3, message: 'Yo'},
                {id: 4, message: 'Yo'},
                {id: 5, message: 'Yo'},
            ],
            newMessageText: 'it-kamasutra.com'
        },
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesAmount: 5},
                {id: 2, message: 'Hi, its my first post', likesAmount: 11},
                {id: 2, message: 'Blabla', likesAmount: 11},
                {id: 2, message: 'Dada', likesAmount: 11},
            ],
            newPostText: 'it-kamasutra.com'
        },
    },
    _callSubscriber(state: RootStateType) {

    },

    getState() {
        return this._state
    },
    subscribe(observer: any) {
        this._callSubscriber = observer; //наблюдатель, паттерн observer
    },

    addPost() {
        let newPost: PostsType = {
            id: 5,
            message: this._state.profilePage.newPostText,
            likesAmount: 0
        }
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = '';
        this._callSubscriber(this._state)
    },
    updateNewPostText(newText: string) {
        this._state.profilePage.newPostText = newText;
        this._callSubscriber(this._state);
    },
    addMessage() {
        let newMessage: MessagesType = {
            id: 3,
            message: this._state.dialogsPage.newMessageText
        }
        this._state.dialogsPage.messages.push(newMessage);
        this._state.dialogsPage.newMessageText = ''
        this._callSubscriber(this._state);
    },
    updateNewMessageText(newText: string) {
        this._state.dialogsPage.newMessageText = newText;
        this._callSubscriber(this._state)
    },

    dispatch(action: any) {
        if (action.type === ADD_POST) {
            let newPost: PostsType = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesAmount: 0
            }
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state)
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        } else if (action.type === ADD_MESSAGE) {
            let newMessage: MessagesType = {
                id: 3,
                message: this._state.dialogsPage.newMessageText
            }
            this._state.dialogsPage.messages.push(newMessage);
            this._state.dialogsPage.newMessageText = ''
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
            this._state.dialogsPage.newMessageText = action.message;
            this._callSubscriber(this._state)
        }

    }
}

export const addPostActionCreator = () => ({type: ADD_POST})
export const updateNewPostTextActionCreator = (text: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    }
}

export const addMessageActionCreator = () => ({type: ADD_MESSAGE})
export const updateNewMessageTextActionCreator = (message: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        message: message
    }
}

export default store;

import {rerenderEntireTree} from "../render";
import {PostsType} from "../components/Profile/MyPosts/MyPosts";
import {DialogsPageType, DialogsType, MessagesType} from "../components/Dialogs/Dialogs";
import {ProfilePageType} from "../components/Profile/Profile";

export type RootStateType = {
    dialogsPage: DialogsPageType
    profilePage: ProfilePageType
}

let state: RootStateType = {
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
}

export let addPost = () => {
    let newPost: PostsType = {
        id: 5,
        message: state.profilePage.newPostText,
        likesAmount: 0
    }
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = '';
    rerenderEntireTree(state);
}
export let updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
}

export let addMessage = () => {
    let newMessage: MessagesType = {
        id: 3,
        message: state.dialogsPage.newMessageText
    }
    state.dialogsPage.messages.push(newMessage);
    state.dialogsPage.newMessageText = ''
    rerenderEntireTree(state);
}
export let updateNewMessageText = (newText: string) => {
    state.dialogsPage.newMessageText = newText;
    rerenderEntireTree(state)

}


export default state
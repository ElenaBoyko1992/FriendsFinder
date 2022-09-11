import {rerenderEntireTree} from "../render";

let state = {
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
    },
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesAmount: 5},
            {id: 2, message: 'Hi, its my first post', likesAmount: 11},
            {id: 2, message: 'Blabla', likesAmount: 11},
            {id: 2, message: 'Dada', likesAmount: 11},
        ],
    },
}

export let addPost = (postMessage: string) => {
    let newPost = {
        id: 5,
        message: postMessage,
        likesAmount: 0
    }
    state.profilePage.posts.push(newPost);
    rerenderEntireTree(state);
}

export default state
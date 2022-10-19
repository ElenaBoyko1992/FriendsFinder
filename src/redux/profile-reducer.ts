import {ActionsTypes} from "./store";
import {PostsType} from "../components/Profile/MyPosts/MyPosts";
import {ProfilePageType} from "../components/Profile/Profile";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesAmount: 5},
        {id: 2, message: 'Hi, its my first post', likesAmount: 11},
        {id: 2, message: 'Blabla', likesAmount: 11},
        {id: 2, message: 'Dada', likesAmount: 11},
    ],
        newPostText: 'it-kamasutra.com'
}

const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case ADD_POST:
            let newPost: PostsType = {
                id: 5,
                message: state.newPostText,
                likesAmount: 0
            };
            state.posts.push(newPost);
            state.newPostText = '';
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }

}

export const addPostActionCreator = () => ({type: ADD_POST}) as const
export const updateNewPostTextActionCreator = (text: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    } as const
}

export default profileReducer;
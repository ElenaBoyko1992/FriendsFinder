import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

type MyPostsContainerType = {
    store: any
}

const MyPostsContainer = (props: MyPostsContainerType) => {
    let state = props.store.getState();
    let addPost = () => {
        props.store.dispatch(addPostActionCreator())
    }

    let onPostChange = (text: string) => {
        props.store.dispatch(updateNewPostTextActionCreator(text))
    }

    return (
        <MyPosts updateNewPostText={onPostChange} addPost={addPost} posts={state.profilePage.posts}
                 newPostText={state.profilePage.newPostText}/>
    )
}

export default MyPostsContainer;
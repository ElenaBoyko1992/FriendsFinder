import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";
import {StoreType} from "../../../redux/store";

const MyPostsContainer = () => {
    return (
        <StoreContext.Consumer>{
            (store: StoreType) => {
                let state = store.getState();

                 let addPost = () => {
                    store.dispatch(addPostActionCreator())
                }
                let onPostChange = (text: string) => {
                    store.dispatch(updateNewPostTextActionCreator(text))
                }

                return (
                    <MyPosts updateNewPostText={onPostChange} addPost={addPost} posts={state.profilePage.posts}
                             newPostText={state.profilePage.newPostText}/>
                )
            }
        }
        </StoreContext.Consumer>
    )
}

export default MyPostsContainer;
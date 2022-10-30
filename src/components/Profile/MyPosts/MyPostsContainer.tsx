import React from 'react';
import {
    addPostActionCreator,
    ProfilePageType,
    updateNewPostTextActionCreator
} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {ReduxStoreType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

type MapStatePropsType = ProfilePageType

type mapDispatchPropsType = {
    updateNewPostText: (text: string) => void
    addPost: () => void
}

export type MyPostsType = MapStatePropsType & mapDispatchPropsType

/*const MyPostsContainer = () => {
    return (
        <StoreContext.Consumer>{
            (store: ReduxStoreType) => {
                let state = store.getState();

                 let addPost = () => {
                    store.dispatch(addPostActionCreator())
                }
                let onPostChange = (text: string) => {
                    store.dispatch(updateNewPostTextActionCreator(text))
                }

                return (
                    <MyPosts updateNewPostText={onPostChange} addPost={addPost}
                             posts={state.profilePage.posts}
                             newPostText={state.profilePage.newPostText}/>
                )
            }
        }
        </StoreContext.Consumer>
    )
}*/ // (создание контейнерной компоненты с данными из контекста без использования библиотеки React-Redux)

let mapStateToProps = (state: ReduxStoreType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
}

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        updateNewPostText: (text: string) => {
            dispatch(updateNewPostTextActionCreator(text));
        },
        addPost: () => {
            dispatch(addPostActionCreator())
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
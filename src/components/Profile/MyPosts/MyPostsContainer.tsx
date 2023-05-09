import React from 'react';
import {
    addPostActionCreator,
    ProfilePageType,
} from "redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {ReduxStoreType} from "redux/redux-store";
import {Dispatch} from "redux";

let mapStateToProps = (state: ReduxStoreType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        status: state.profilePage.status,
        profile: state.profilePage.profile
    }
}

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        addPost: (newPost: string) => {
            dispatch(addPostActionCreator(newPost))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

//types
type MapStatePropsType = ProfilePageType

type mapDispatchPropsType = {
    addPost: (newPost: string) => void
}

export type MyPostsType = MapStatePropsType & mapDispatchPropsType
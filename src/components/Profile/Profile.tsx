import React from 'react';
import MyPosts, {PostsType} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsTypes} from "../../redux/state";

export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}
type ProfileType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionsTypes) => void
}

const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo/>

            <MyPosts posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}
                     dispatch={props.dispatch}
            />
        </div>
    )
}

export default Profile;
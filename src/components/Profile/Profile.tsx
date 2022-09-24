import React from 'react';
import MyPosts, {PostsType} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}
type ProfileType = {
    profilePage: ProfilePageType
    dispatch: (action: any) => void
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
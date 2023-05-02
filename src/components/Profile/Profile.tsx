import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {PropsType} from "./ProfileContainer";

const Profile = (props: PropsType) => {

    return (
        <div>
            <ProfileInfo savePhoto={props.savePhoto} profile={props.profile} status={props.status}
                         updateStatus={props.updateStatus} isOwner={props.isOwner}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;
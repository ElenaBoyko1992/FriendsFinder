import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileContainerPropsType} from "components/Profile/ProfileContainer";


const Profile = (props: ProfileContainerPropsType & { isOwner: boolean }) => {

    return (
        <div>
            <ProfileInfo savePhoto={props.savePhoto} profile={props.profile} status={props.status}
                         updateStatus={props.updateStatus} isOwner={props.isOwner} saveProfile={props.saveProfile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;
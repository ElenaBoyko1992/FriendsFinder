import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileContainerPropsType} from "components/Profile/ProfileContainer";
import userPhoto from "assets/images/defaultAvatar.png";
import s from "components/Profile/ProfileInfo/ProfileInfo.module.css";


const Profile = (props: ProfileContainerPropsType & { isOwner: boolean }) => {

    return (
        <div>
            <img src={profile.photos?.large || userPhoto} alt={''} className={s.mainPhoto}/>
            <ProfileInfo savePhoto={props.savePhoto} profile={props.profile} status={props.status}
                         updateStatus={props.updateStatus} isOwner={props.isOwner} saveProfile={props.saveProfile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;
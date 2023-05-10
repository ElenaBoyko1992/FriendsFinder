import React, {ChangeEvent} from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileContainerPropsType} from "components/Profile/ProfileContainer";
import userPhoto from "assets/images/defaultAvatar.png";
import s from "components/Profile/ProfileInfo/ProfileInfo.module.css";


const Profile = (props: ProfileContainerPropsType & { isOwner: boolean }) => {





    return (
        <div className={s.profile}>
            {/*<div className={s.mainPhoto}>*/}
            {/*    <img src={props.profile?.photos?.large || userPhoto} alt={''}/>*/}
            {/*    <div>*/}
            {/*        {props.isOwner && <input type="file" onChange={onMainPhotoSelected} />}*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div>
                <ProfileInfo savePhoto={props.savePhoto} profile={props.profile} status={props.status}
                             updateStatus={props.updateStatus} isOwner={props.isOwner} saveProfile={props.saveProfile}/>
                <MyPostsContainer/>
            </div>
        </div>
    )
}

export default Profile;
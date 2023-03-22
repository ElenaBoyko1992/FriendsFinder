import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

type ProfileInfoType = {
    profile: ProfileType | null | undefined
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo = ({profile, status, updateStatus}: ProfileInfoType) => {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large} alt={''}/>
                <br/>
                about me: {profile.aboutMe}
                <br/>
                contacts: {profile.contacts.twitter}
                <br/>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;
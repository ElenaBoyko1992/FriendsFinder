import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';
import commonStyles from '../../common/CommonStyles.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/defaultAvatar.png";
import ProfileDataForm from "components/Profile/ProfileInfo/ProfileDataForm";
import {ProfileType} from "api/types";
import {ProfileData} from "components/Profile/ProfileInfo/ProfileData";


const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}: ProfileInfoType) => {

    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0]);
        }
    }
    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false)
            });
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <div className={s.mainPhoto}>
                    <div>
                        <img src={profile?.photos?.large || userPhoto} alt={''}/>
                    </div>
                    <div>
                        {isOwner && <input type="file" onChange={onMainPhotoSelected} className={s.buttonFile}/>}
                    </div>
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                </div>
                <div className={s.userInfo}>
                    {editMode ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/> :
                        <ProfileData goToEditMode={() => setEditMode(true)} profile={profile} isOwner={isOwner}/>}

                </div>
            </div>
        </div>
    )
}

//types
type ProfileInfoType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: any) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

export default ProfileInfo;
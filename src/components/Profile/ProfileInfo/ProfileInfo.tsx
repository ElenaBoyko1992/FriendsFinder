import React, {ChangeEvent, ChangeEventHandler, useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import {ProfileType} from "redux/profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/defaultAvatar.png";
import ProfileDataForm from "components/Profile/ProfileInfo/ProfileDataForm";
import {ProfileForUpdateType} from "api/api";


// type ProfileInfoType = {
//     profile: null | undefined | ProfileType
//     status: string
//     updateStatus: (status: string) => void
//     isOwner: boolean
//     savePhoto: (file: any) => void
//     saveProfile: (profile: ProfileForUpdateType) => void
// }

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}: any) => {

    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData: any) => {

        // saveProfile(formData);
        console.log(formData)
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} alt={''} className={s.mainPhoto}/>
                {isOwner && <input type="file" onChange={onMainPhotoSelected}/>}

                {editMode ? <ProfileDataForm profile={profile} onSubmit={onSubmit}/> :
                    <ProfileData goToEditMode={() => setEditMode(true)} profile={profile} isOwner={isOwner}/>}

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

const ProfileData = ({profile, isOwner, goToEditMode}: any) => {
    return <div>
        <div>
            {isOwner && <button onClick={goToEditMode}>edit</button>}
        </div>
        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>}
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
    </div>
}

const Contact = ({contactTitle, contactValue}: ContactPropsType) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

//types
type ContactPropsType = {
    contactTitle: string
    contactValue: string
}
// type ProfileDataPropsType = {
//     profile: ProfileType
//     isOwner: boolean
//     goToEditMode: () => void
// }

export default ProfileInfo;
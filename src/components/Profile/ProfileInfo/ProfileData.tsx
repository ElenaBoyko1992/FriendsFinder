import s from "components/Profile/ProfileInfo/ProfileInfo.module.css";
import commonStyles from "components/common/CommonStyles.module.css";
import React from "react";
import {ProfileType} from "api/types";

export const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataType) => {
    return <div className={s.userData}>
        <div>
            <div className={s.userDataRow}>
                <b>Full name</b>: {profile.fullName}
            </div>
            <div className={s.userDataRow}>
                <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {profile.lookingForAJob &&
                <div className={s.userDataRow}>
                    <b>My professional skills</b>: {profile.lookingForAJobDescription}
                </div>}
            <div className={s.userDataRow}>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div className={s.userDataRow}>
                <b>Contacts</b>: {Object.keys(profile.contacts).map((key) => {
                return <Contact key={key} contactTitle={key}
                                contactValue={profile.contacts[key as keyof typeof profile.contacts]}/>
            })}
            </div>
            <div className={s.buttonWrapper}>
                {isOwner && <button onClick={goToEditMode} className={commonStyles.button}>edit</button>}
            </div>
        </div>
    </div>
}
export const Contact = ({contactTitle, contactValue}: ContactPropsType) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}
//types
type ContactPropsType = {
    contactTitle: string
    contactValue: string | null
}
type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
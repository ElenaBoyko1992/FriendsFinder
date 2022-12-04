import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import {ProfileMapStatePropsType} from "../ProfileContainer";


const ProfileInfo = (props: ProfileMapStatePropsType) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                {/*                <img
                    src="https://atlantis-cms-assets.s3.us-east-2.amazonaws.com/styled/be395bb860f928a4764100c82e91951f"
                    alt=""/>*/}
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large} alt={''}/>
                <br/>
                about me: {props.profile.aboutMe}
                <br/>
                contacts: {props.profile.contacts.twitter}
                <br/>
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo;
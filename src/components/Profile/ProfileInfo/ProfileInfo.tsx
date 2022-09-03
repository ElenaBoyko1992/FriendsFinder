import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
        <div>
            <div>
                {/*                <img
                    src="https://atlantis-cms-assets.s3.us-east-2.amazonaws.com/styled/be395bb860f928a4764100c82e91951f"
                    alt=""/>*/}
            </div>
            <div className={s.descriptionBlock}>
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo;
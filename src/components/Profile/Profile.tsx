import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return (
        <div>
            <div>
                {/*                <img
                    src="https://atlantis-cms-assets.s3.us-east-2.amazonaws.com/styled/be395bb860f928a4764100c82e91951f"
                    alt=""/>*/}
            </div>
            <div>
                ava + description
            </div>
           <MyPosts/>
        </div>
    )
}

export default Profile;
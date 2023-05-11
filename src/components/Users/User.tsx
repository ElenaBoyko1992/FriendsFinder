import React from "react";
import s from "./users.module.css";
import userPhoto from "../../assets/images/defaultAvatar.png";
import {NavLink} from "react-router-dom";
import {UserType} from "api/types";

let User = ({user, followingInProgress, unfollow, follow}: UserPropsType) => {

    return <div key={user.id} className={s.user}>
        <div>
            <NavLink to={'/profile/' + user.id}>
                <img src={user.photos.small ? user.photos.small : userPhoto} className={s.userPhoto}
                     alt={''}/>
            </NavLink>
        </div>

        <div className={s.name}>{user.name}</div>

        <div>
            {user.followed
                ? <button disabled={followingInProgress.some((id: number) => id === user.id)}
                          onClick={() => unfollow(user.id)} className={s.button}>Unfollow</button>
                : <button disabled={followingInProgress.some((id: number) => id === user.id)}
                          onClick={() => follow(user.id)} className={s.button}>Follow</button>}
        </div>
    </div>
}

export default User

//types
export type UserPropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}
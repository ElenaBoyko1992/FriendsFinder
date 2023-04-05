import React from "react";
import s from "./users.module.css";
import userPhoto from "../../assets/images/defaultAvatar.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";


export type UserPropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let User = ({user, followingInProgress, unfollow, follow}: UserPropsType) => {

    return <div key={user.id}>
                    <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small ? user.photos.small : userPhoto} className={s.userPhoto}
                                 alt={''}/>
                        </NavLink>
                    </div>
                    <div>
                {user.followed
                    ? <button disabled={followingInProgress.some((id: number) => id === user.id)}
                              onClick={() => unfollow(user.id)}>Unfollow</button>
                    : <button disabled={followingInProgress.some((id: number) => id === user.id)}
                              onClick={() => follow(user.id)}>Follow</button>}
                    </div>
                    </span>
        <span>
                    <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                    </span>
                    <span>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                    </span>
                    </span>
    </div>
}

export default User
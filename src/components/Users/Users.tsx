import React from "react";
import s from "./users.module.css";
import userPhoto from "../../assets/images/defaultAvatar.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";


type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

let Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span className={(props.currentPage === p) ? s.selectedPage : ''}
                             onClick={() => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })
            }
        </div>
        {
            props.users.map(u => <div key={u.id}>
                    <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small ? u.photos.small : userPhoto} className={s.userPhoto} alt={''}/>
                        </NavLink>
                    </div>
                    <div>
                {u.followed
                    ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                              onClick={() => props.unfollow(u.id)}>Unfollow</button>
                    : <button disabled={props.followingInProgress.some(id => id === u.id)}
                              onClick={() => props.follow(u.id)}>Follow</button>}
                    </div>
                    </span>
                <span>
                    <span>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                    </span>
                    <span>
                    <div>{"u.location.country"}</div>
                    <div>{"u.location.city"}</div>
                    </span>
                    </span>
            </div>)
        }
    </div>
}

export default Users
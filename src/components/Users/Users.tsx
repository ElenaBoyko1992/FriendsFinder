import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "api/types";
import s from './users.module.css'

let Users = ({
                 currentPage,
                 totalUsersCount,
                 pageSize,
                 onPageChanged,
                 users,
                 followingInProgress,
                 follow,
                 unfollow,
                 ...props
             }: UsersPropsType) => {

    return <div className={s.usersPage}>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged} pageSize={pageSize}
                   totalItemsCount={totalUsersCount} portionSize={10}/>
        <div className={s.users}>
            {
                users.map(u => <User key={u.id} user={u} followingInProgress={followingInProgress} follow={follow}
                                     unfollow={unfollow}/>)
            }
        </div>
    </div>
}

export default Users

//types
export type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}
import React from "react";
import {UserType} from "../../redux/users-reducer";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


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

    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged} pageSize={pageSize}
                   totalItemsCount={totalUsersCount} portionSize={10}/>
        <div>
            {
                users.map(u => <User key={u.id} user={u} followingInProgress={followingInProgress} follow={follow}
                                     unfollow={unfollow}/>)
            }
        </div>
    </div>
}

export default Users
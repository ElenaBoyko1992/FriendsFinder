import React from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {followAC, setUsersAC, unfollowAC, UsersPageType, UserType} from "../../redux/users-reducer";
import {ReduxStoreType} from "../../redux/redux-store";
import {Dispatch} from "redux";

type MapStatePropsType = {
    users: Array<UserType>
}

type mapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
}

export type UsersPropsType = MapStatePropsType & mapDispatchPropsType

let mapStateToProps = (state: ReduxStoreType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
    }
}

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        }
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UsersContainer;

import React from "react";
import {connect} from "react-redux";
import {ReduxStoreType} from "redux/redux-store";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {
    setCurrentPage,
    follow, unfollow, requestUsers
} from "redux/users-reducer";

import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "redux/users-selectors";
import {UserType} from "api/types";
import {compose} from "redux";
import {withAuthRedirect} from "hoc/withAuthRedirect";
import Dialogs from "components/Dialogs/Dialogs";

class UsersContainer extends React.Component<UsersAPIComponentPropsType> {

    componentDidMount() {
        const {requestUsers, currentPage, pageSize} = this.props
        requestUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {requestUsers, pageSize} = this.props
        requestUsers(pageNumber, pageSize)
    }

    render() {
        return <>
            {/*{this.props.isFetching ? <Preloader/> : null}*/}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}
                follow={this.props.follow}
                unfollow={this.props.unfollow}

            />
        </>
    }
}

let mapStateToProps = (state: ReduxStoreType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        setCurrentPage, requestUsers, follow, unfollow
    }),
    withAuthRedirect)(UsersContainer)
//types
type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}
type MapDispatchPropsType = {
    setCurrentPage: (pageNumber: number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

type UsersAPIComponentPropsType = MapStatePropsType & MapDispatchPropsType
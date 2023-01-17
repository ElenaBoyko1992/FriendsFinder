import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, ProfileType, updateStatus} from "../../redux/profile-reducer";
import {Redirect, withRouter} from "react-router-dom";
import {ReduxStoreType} from "../../redux/redux-store";
import {RouteComponentProps} from "react-router";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import Dialogs from "../Dialogs/Dialogs";

export type  ProfileMapStatePropsType = {
    profile: null | undefined | ProfileType
    status: string
}
type  MapDispatchPropsType = {
    getUserProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
}
type ProfileContainerPropsType = ProfileMapStatePropsType & MapDispatchPropsType

type DataFromWithRouterType = {
    userId?: string | undefined
}
export type PropsType = RouteComponentProps<DataFromWithRouterType> & ProfileContainerPropsType


class ProfileContainer extends React.Component<PropsType> {


    componentDidMount() {

        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2'
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {

        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                     updateStatus={this.props.updateStatus}/>
        )
    }
}

const mapStateToProps = (state: ReduxStoreType): ProfileMapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
)(ProfileContainer)
import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {ReduxStoreType} from "redux/redux-store";
import {RouteComponentProps} from "react-router";
import {compose} from "redux";
import {ProfileType} from "api/types";
import {withAuthRedirect} from "hoc/withAuthRedirect";

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    refreshProfile() {
        let userId
        if (this.props.match.params.userId) {
            userId = +this.props.match.params.userId
        }

        if (!userId) {
            userId = this.props.autorizedUserId
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        if (userId) {
            this.props.getUserProfile(userId)
            this.props.getStatus(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: Readonly<ProfileContainerPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {

        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                     updateStatus={this.props.updateStatus} isOwner={!this.props.match.params.userId}
                     savePhoto={this.props.savePhoto}/>
        )
    }
}

const mapStateToProps = (state: ReduxStoreType): ProfileMapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

//types
type  ProfileMapStatePropsType = {
    profile: null | ProfileType
    status: string
    autorizedUserId: number | null
    isAuth: boolean
};
type  MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type DataFromWithRouterType = {
    userId?: string
}
export type ProfileContainerPropsType =
    RouteComponentProps<DataFromWithRouterType>
    & ProfileMapStatePropsType
    & MapDispatchPropsType

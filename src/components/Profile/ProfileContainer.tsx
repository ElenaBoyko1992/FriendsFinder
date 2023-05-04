import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {ReduxStoreType} from "redux/redux-store";
import {RouteComponentProps} from "react-router";
import {compose} from "redux";
import {ProfileType} from "api/api";


export type  ProfileMapStatePropsType = {
    profile: null | undefined | ProfileType
    status: string
    autorizedUserId: any
    isAuth: boolean
};
type  MapDispatchPropsType = {
    getUserProfile: (userId: string) => void
    getStatus: (userId: string | undefined) => void
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
type ProfileContainerPropsType = ProfileMapStatePropsType & MapDispatchPropsType

type DataFromWithRouterType = {
    userId?: string
}
export type PropsType = RouteComponentProps<DataFromWithRouterType> & ProfileContainerPropsType & { isOwner: boolean }


class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId = this.props.match.params.userId
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

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
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
)(ProfileContainer)
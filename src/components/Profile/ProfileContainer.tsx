import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfileDataTh, ProfileType} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {ReduxStoreType} from "../../redux/redux-store";
import {RouteComponentProps} from "react-router";

export type  ProfileMapStatePropsType = {
    profile: null | undefined | ProfileType
}
type  MapDispatchPropsType = {
    getUserProfileDataTh: (userId: string) => void
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
        this.props.getUserProfileDataTh(userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

const mapStateToProps = (state: ReduxStoreType): ProfileMapStatePropsType => ({
    profile: state.profilePage.profile
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {getUserProfileDataTh})(WithUrlDataContainerComponent);


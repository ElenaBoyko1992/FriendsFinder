import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import store, {ReduxStoreType} from "../../redux/redux-store";
import {RouteComponentProps} from "react-router";

export type  MapStatePropsType = {
    profile: null | undefined | ProfileType
}
type  MapDispatchPropsType = {
    setUserProfile: (profile: ProfileType) => void
}
type ProfileContainerPropsType = MapStatePropsType & MapDispatchPropsType

type DataFromWithRouterType = {
    userId?: string | undefined
}
type PropsType = RouteComponentProps<DataFromWithRouterType> & ProfileContainerPropsType


class ProfileContainer extends React.Component<PropsType> {


    componentDidMount() {

        let userId = this.props.match.params.userId
        console.log(typeof userId)
        if (!userId) {
            userId = '2'
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setUserProfile(response.data);
            })
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

const mapStateToProps = (state: ReduxStoreType): MapStatePropsType => ({
    profile: state.profilePage.profile
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);


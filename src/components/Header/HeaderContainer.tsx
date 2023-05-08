import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "redux/auth-reducer";
import {ReduxStoreType} from "redux/redux-store";

class HeaderContainer extends React.Component<HeaderPropsType> {
    render() {
        return (
            <Header {...this.props}/>
        )
    }

}

const mapStateToProps = (state: ReduxStoreType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    userAvatar: state.profilePage.profile?.photos?.small
});

export default connect(mapStateToProps, {logout})(HeaderContainer);

//types
type MapStatePropsType = {
    isAuth: boolean,
    login: null | string,
    userAvatar?: null | string
}
type MapDispatchPropsType = {
    logout: () => void
}

export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType

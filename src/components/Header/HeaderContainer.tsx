import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {checkAuthTh, setAuthUserData, setUserAvatar} from "../../redux/auth-reducer";
import {ReduxStoreType} from "../../redux/redux-store";


type MapStatePropsType = {
    isAuth: boolean,
    login: null | string,
    userAvatar: null | string
}
type MapDispatchPropsType = {
    checkAuthTh: () => void
}

export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType


class HeaderContainer extends React.Component<HeaderPropsType> {

    componentDidMount() {
        this.props.checkAuthTh()
    }

    render() {
        return (
            <Header {...this.props}/>
        )
    }

}

const mapStateToProps = (state: ReduxStoreType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    userAvatar: state.auth.userAvatar
});

export default connect(mapStateToProps, {checkAuthTh})(HeaderContainer);
import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {setAuthUserData, setUserAvatar} from "../../redux/auth-reducer";
import {ReduxStoreType} from "../../redux/redux-store";
import {authAPI} from "../../api/api";


type MapStatePropsType = {
    isAuth: boolean,
    login: null | string,
    userAvatar: null | string
}
type MapDispatchPropsType = {
    setAuthUserData: (userId: string, email: string, login: string) => void
    setUserAvatar: (srcAddress: string) => void
}

export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType


class HeaderContainer extends React.Component<HeaderPropsType> {

    componentDidMount() {
        authAPI.checkAuth()
            .then((data: any) => {
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data
                    this.props.setAuthUserData(id, email, login)
                    authAPI.getMyProfileData(id)
                        .then(data => {
                            this.props.setUserAvatar(data.photos.small);
                        })
                }
            })
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

export default connect(mapStateToProps, {setAuthUserData, setUserAvatar})(HeaderContainer);
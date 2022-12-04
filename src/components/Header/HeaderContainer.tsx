import React from 'react';
import Header from "./Header";
import {default as axios} from "axios";
import {connect} from "react-redux";
import {setAuthUserData, setUserAvatar} from "../../redux/auth-reducer";
import {ReduxStoreType} from "../../redux/redux-store";


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
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then((response: any) => {
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data
                    this.props.setAuthUserData(id, email, login)
                    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`)
                        .then(response => {
                            this.props.setUserAvatar(response.data.photos.small);
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
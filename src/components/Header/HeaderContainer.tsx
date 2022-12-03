import React from 'react';
import Header from "./Header";
import {default as axios} from "axios";
import {connect} from "react-redux";
import {setAuthUserData, setUserAvatar} from "../../redux/auth-reducer";
import profile from "../Profile/Profile";

class HeaderContainer extends React.Component<any, any> {

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

const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    userAvatar: state.auth.userAvatar
});

export default connect(mapStateToProps, {setAuthUserData, setUserAvatar})(HeaderContainer);
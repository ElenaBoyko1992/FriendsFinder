import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";

class ProfileContainer extends React.Component<any, any> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfile(response.data);
            })
    }

    render() {
        debugger
        return (
            <Profile {...this.props}/>
        )
    }
}

const mapStateToProps = (state: any)=>({
    a:13
})

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);


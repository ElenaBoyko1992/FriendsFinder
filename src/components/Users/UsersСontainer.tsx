import React from "react";
import {RootStateType} from "../../redux/store";
import Users from "./Users";
import {connect} from "react-redux";

let mapStateToProps = (state: RootStateType) => {
    return {
        users: state.usersPage.users
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
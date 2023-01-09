import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {ReduxStoreType} from "../redux/redux-store";
import {connect} from "react-redux";

export type  ProfileMapStatePropsTypeForRedirect = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: ReduxStoreType): ProfileMapStatePropsTypeForRedirect => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent = (props: ProfileMapStatePropsTypeForRedirect) => {
        let {isAuth, ...restProps} = props

        if (!isAuth) return <Redirect to={"/Login"}/>
        return <Component {...restProps as T}/>
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
    return ConnectedAuthRedirectComponent;
}

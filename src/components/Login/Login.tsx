import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {ReduxStoreType} from "../../redux/redux-store";
import style from '../common/FormsControls/FormsControls.module.css'


type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}
type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
}
type MapStatePropsType = {
    isAuth: boolean
}
const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>
                Login
            </h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({error, handleSubmit}) => {

        console.log(error)
        return (
            <form onSubmit={handleSubmit}>
                {createField('Email', 'email', [required], Input)}
                {createField('Password', 'password', [required], Input, {type: 'password'})}
                {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}
                {error && <div className={style.formSummaryError}>
                    {error}
                </div>}
                <div>
                    <button>Login</button>
                </div>
            </form>
        );
    }
;

const LoginReduxForm = reduxForm<FormDataType>({
    // a unique name for the form
    form: 'login'
})(LoginForm)

const mapStateToProps = (state: ReduxStoreType): MapStatePropsType => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login})(Login);
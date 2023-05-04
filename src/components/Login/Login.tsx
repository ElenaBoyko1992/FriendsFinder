import React, {FC} from 'react';
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
    captcha: string | null
}
type LoginPropsType = MapStatePropsType & MapDispatchPropsType

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}
const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>
                Login
            </h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    );
};

const LoginForm: FC<InjectedFormProps<FormDataType, LoginReduxFormType> & LoginReduxFormType> = ({
                                                                                                     error,
                                                                                                     handleSubmit,
                                                                                                     captchaUrl
                                                                                                 }) => {

        console.log(error)
        return (
            <form onSubmit={handleSubmit}>
                {createField('Email', 'email', [required], Input)}
                {createField('Password', 'password', [required], Input, {type: 'password'})}
                {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}

                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl && createField('Symbols from image', 'captcha', [required], Input)}

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

const LoginReduxForm = reduxForm<FormDataType, LoginReduxFormType>({
    // a unique name for the form
    form: 'login'
})(LoginForm)

const mapStateToProps = (state: ReduxStoreType): MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login})(Login);

//types
type LoginReduxFormType = {
    captchaUrl: string | null
}
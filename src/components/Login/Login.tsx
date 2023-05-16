import React, {FC} from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "utils/validators/validators";
import {connect} from "react-redux";
import {login} from "redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {ReduxStoreType} from "redux/redux-store";
import style from '../common/FormsControls/FormsControls.module.css'
import s from './Login.module.css'
import commonStyles from '../common/CommonStyles.module.css'

const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={s.login}>
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
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    {createField('Email', 'email', [required], Input)}
                    {createField('Password', 'password', [required], Input, {type: 'password'})}
                    <div className={s.rememberMe}>
                        {createField(null, 'rememberMe', [], Input, {type: 'checkbox'})}
                        <span>remember me</span>
                    </div>


                    {captchaUrl && <img src={captchaUrl}/>}
                    {captchaUrl && createField('Symbols from image', 'captcha', [required], Input)}

                    {error && <div className={style.formSummaryError}>
                        {error}
                    </div>}
                    <div>
                        <button className={commonStyles.button}>Login</button>
                    </div>
                </form>
                <br/>
                <br/>
                <div className={s.testAccountData}>
                    To access, please enter the test account data:
                    <div className={s.data}>
                        Email: free@samuraijs.com
                        <br/>
                        Password: free
                    </div>

                </div>

            </div>
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
type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}
type LoginPropsType = MapStatePropsType & MapDispatchPropsType
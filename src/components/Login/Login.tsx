import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const Login = () => {
    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
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

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
        return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={'Login'} component={Input} name={'login'}
                           validate={[required]}/>
                </div>
                <div>
                    <Field placeholder={'Password'} component={Input} name={'password'}
                           validate={[required]}/>
                </div>
                <div>
                    <Field component={Input} type={'checkbox'} name={'rememberMe'}/> remember me
                </div>
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

export default Login;
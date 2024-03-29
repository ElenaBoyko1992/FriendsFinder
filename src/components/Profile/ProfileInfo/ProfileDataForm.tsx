import React, {FC} from "react";
import {createField, Input, Textarea} from "components/common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from './ProfileInfo.module.css';
import commonStyles from '../../common/CommonStyles.module.css';
import style from '../../common/FormsControls/FormsControls.module.css'
import {ProfileType} from "api/types";

const ProfileDataForm: FC<InjectedFormProps<FieldFromType, OtherFormProps> & OtherFormProps> = ({
                                                                                                    profile,
                                                                                                    handleSubmit,
                                                                                                    error
                                                                                                }) => {
    return <form onSubmit={handleSubmit}>

        {error && <div className={style.formSummaryError}>
            {error}
        </div>}
        <div>
            <b>Full name</b>: {createField('Full name', 'fullName', [], Input)}
        </div>
        <div>
            <b>Looking for a job</b>: {createField('', 'lookingForAJob', [], Input, {type: 'checkBox'})}
        </div>
        <div>
            <b>My professional
                skills</b>: {createField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
        </div>
        <div>
            <b>About me</b>:
            {createField('About me', 'aboutMe', [], Textarea)}
        </div>

        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                <b>{key}: {createField(key, 'contacts.' + key, [], Input)}</b>
            </div>
        })}
        </div>
        <div className={s.buttonWrapper}>
            <button className={commonStyles.button}>save</button>
        </div>
    </form>
}


const ProfileDataFormReduxForm = reduxForm<FieldFromType, OtherFormProps>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm

//types
type FieldFromType = ProfileType

type OtherFormProps = {
    initialValues: any
    profile: ProfileType
}
import React, {FC} from "react";
import {createField, Input, Textarea} from "components/common/FormsControls/FormsControls";
import {Form, InjectedFormProps, reduxForm} from "redux-form";
import {ProfileType} from "api/api";


type FieldFromType = {
    fullName: string
    lookingForAJob: string
    lookingForAJobDescription: string
    aboutMe: string
}

type OtherFormProps = {
    profile: ProfileType
}

const ProfileDataForm: FC<InjectedFormProps<FieldFromType,OtherFormProps> & OtherFormProps> = ({profile, handleSubmit}) => {

    return <form onSubmit={handleSubmit} >

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
        {/*<div>*/}
        {/*    <b>About me</b>: {profile.aboutMe}*/}
        {/*    {createField('About me', 'aboutMe', [], Textarea)}*/}
        {/*</div>*/}
        <div>
            <button>save</button>
        </div>
        {/*<div>*/}
        {/*    <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {*/}
        {/*    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>*/}
        {/*})}*/}
        {/*</div>*/}
    </form>
}



const ProfileDataFormReduxForm = reduxForm<FieldFromType, OtherFormProps>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm
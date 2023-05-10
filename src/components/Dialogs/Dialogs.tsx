import React from 'react';
import s from './Dialogs.module.css';
import commonStyles from '../common/CommonStyles.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "utils/validators/validators";

const Dialogs = (props: DialogsPropsType) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>);

    const addNewMessage = (values: AddNewMessageValuesType) => {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={s.dialogsPage}>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    <div>{messagesElements}</div>
                    <AddMessageFormRedux onSubmit={addNewMessage}/>
                </div>
            </div>


        </div>
    )
}

const maxLength100 = maxLengthCreator(100);

const AddMessageForm: React.FC<InjectedFormProps<AddNewMessageValuesType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.messageForm}>
            <div>
                {createField('Enter your message', 'newMessageBody', [required, maxLength100], Textarea, {}, '', `${commonStyles.textarea}`)}
            </div>
            <div>
                <button className={`${s.messageFormButton} ${commonStyles.button}`}>Send</button>
            </div>
        </form>

    )
}

const AddMessageFormRedux = reduxForm<AddNewMessageValuesType>({
    // a unique name for the form
    form: 'dialogAddMessageForm'
})(AddMessageForm)

export default Dialogs;

//types
type AddNewMessageValuesType = {
    newMessageBody: string
}
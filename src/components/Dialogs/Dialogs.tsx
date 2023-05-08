import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "utils/validators/validators";

const Dialogs = (props: DialogsPropsType) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={Math.random()} id={d.id}/>);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={Math.random()}/>);

    const addNewMessage = (values: AddNewMessageValuesType) => {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}

const maxLength100 = maxLengthCreator(100);

const AddMessageForm: React.FC<InjectedFormProps<AddNewMessageValuesType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Enter your message'} component={Textarea} name={'newMessageBody'}
                       validate={[required, maxLength100]}/>
            </div>
            <div>
                <button>Send</button>
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
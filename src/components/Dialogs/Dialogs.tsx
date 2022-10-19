import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {ActionsTypes} from "../../redux/store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";

type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}
export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageBody: string
}
type DialogsPropsType = {
    dialogsPage: DialogsPageType
    dispatch: (action: ActionsTypes) => void
}

const Dialogs = (props: DialogsPropsType) => {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);

    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message}/>);

    let onSendMessageClick = () => {
        props.dispatch(sendMessageCreator())
    }

    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let message = e.currentTarget.value
        props.dispatch(updateNewMessageBodyCreator(message))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea onChange={onNewMessageChange}
                                   value={props.dialogsPage.newMessageBody}
                                   placeholder={'Enter your message'}></textarea></div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;
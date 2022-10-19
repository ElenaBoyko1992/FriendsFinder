import React, {ChangeEvent} from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

type DialogsContainerPropsType = {
    store: any
}

const DialogsContainer = (props: DialogsContainerPropsType) => {
    let state = props.store.getState().dialogsPage

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator())
    }

    let onNewMessageChange = (message: string) => {
        props.store.dispatch(updateNewMessageBodyCreator(message))
    }

    return (
        <Dialogs updateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick}
                 dialogsPage={state}
        />
    )
}

export default DialogsContainer;
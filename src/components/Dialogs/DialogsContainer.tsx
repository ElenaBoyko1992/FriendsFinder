import React, {ChangeEvent} from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";
import {StoreType} from "../../redux/store";

const DialogsContainer = () => {

    return (
        <StoreContext.Consumer>{
            (store: StoreType) => {
                let state = store.getState().dialogsPage

                let onSendMessageClick = () => {
                    store.dispatch(sendMessageCreator())
                }

                let onNewMessageChange = (message: string) => {
                    store.dispatch(updateNewMessageBodyCreator(message))
                }
                return (
                    <Dialogs updateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick}
                             dialogsPage={state}
                    />
                )
            }
        }

        </StoreContext.Consumer>
    )
}

export default DialogsContainer;
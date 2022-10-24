import React, {ChangeEvent} from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext(архив)";
import {ActionsTypes, RootStateType, StoreType} from "../../redux/store";
import {ReduxStoreType} from "../../redux/redux-store";
import {connect} from "react-redux";

/*const DialogsContainer = () => {

    return (
        <StoreContext.Consumer>{
            (store: ReduxStoreType) => {
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
}*/ //для архива (создание контейнерной компоненты с данными из контекста без использования библиотеки React-Redux)

let mapStateToProps = (state: RootStateType) => { //смысл данной функции замапить часть стейта на нужные нашей презентационной компоненте пропсы
    return {
        dialogsPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch: any) => { //смысл данной функции замапить часть коллбэков из стора на нужные нашей презентационной компоненте пропсы
    return {
        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyCreator(body));

        },
        sendMessage: () => {
            dispatch(sendMessageCreator());
        },
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs);

export default DialogsContainer;
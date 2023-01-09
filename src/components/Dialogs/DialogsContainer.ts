import React from 'react';
import {DialogsPageType, sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {ReduxStoreType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {Redirect} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type MapStatePropsType = {
    dialogsPage: DialogsPageType
}
type mapDispatchPropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
}
export type DialogsPropsType = MapStatePropsType & mapDispatchPropsType

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

let mapStateToProps = (state: ReduxStoreType): MapStatePropsType => { //смысл данной функции замапить часть стейта на нужные нашей презентационной компоненте пропсы
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => { //смысл данной функции замапить часть коллбэков из стора на нужные нашей презентационной компоненте пропсы
    return {
        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyCreator(body));

        },
        sendMessage: () => {
            dispatch(sendMessageCreator());
        },
    }
}

/*let AuthRedirectComponent = withAuthRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
export default DialogsContainer*/

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect)(Dialogs)


import React from 'react';
import {DialogsPageType, sendMessageCreator} from "redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {ReduxStoreType} from "redux/redux-store";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "hoc/withAuthRedirect";

let mapStateToProps = (state: ReduxStoreType): MapStatePropsType => { //смысл данной функции замапить часть стейта на нужные нашей презентационной компоненте пропсы
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => { //смысл данной функции замапить часть коллбэков из стора на нужные нашей презентационной компоненте пропсы
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(sendMessageCreator(newMessageBody));
        },
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect)(Dialogs)

//types
type MapStatePropsType = {
    dialogsPage: DialogsPageType
}
type mapDispatchPropsType = {
    sendMessage: (newMessageBody: string) => void
}
export type DialogsPropsType = MapStatePropsType & mapDispatchPropsType
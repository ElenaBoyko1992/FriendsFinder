import {ActionsTypes} from "./state";
import {MessagesType} from "../components/Dialogs/Dialogs";

const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';

const dialogsReduser = (state: any, action: ActionsTypes) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage: MessagesType = {
                id: 3,
                message: state.newMessageBody
            }
            state.messages.push(newMessage);
            state.newMessageBody = '';
            return state;
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.message;
            return state;
        default:
            return state;
    }
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE}) as const
export const updateNewMessageBodyCreator = (message: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        message: message
    } as const
}

export default dialogsReduser;
import {ActionsTypes} from "./store";
import {DialogsPageType, MessagesType} from "../components/Dialogs/Dialogs";

const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';

let initialState = {
        dialogs: [
            {id: 1, name: 'Dimych'},
            {id: 2, name: 'Andrey'},
            {id: 3, name: 'Sveta'},
            {id: 4, name: 'Sasha'},
            {id: 5, name: 'Viktor'},
            {id: 6, name: 'Valera'},
        ],
        messages: [
            {id: 1, message: 'Hi'},
            {id: 2, message: 'How are you?'},
            {id: 3, message: 'Yo'},
            {id: 4, message: 'Yo'},
            {id: 5, message: 'Yo'},
        ],
        newMessageBody: '',
    }

const dialogsReduser = (state: DialogsPageType = initialState, action: ActionsTypes) => {
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
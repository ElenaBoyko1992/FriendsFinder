import dialogsReducer, {sendMessageCreator} from "./dialogs-reducer";

const startState = {
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
    ]
};

test('message must be sent', () => {

    const endState = dialogsReducer(startState, sendMessageCreator('How are you today?'))

    expect(endState.messages.length).toBe(6);
    expect(endState.messages[5].message).toBe('How are you today?');
});
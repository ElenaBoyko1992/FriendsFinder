import profileReducer, {addPostActionCreator, updateNewPostTextActionCreator} from "./profile-reducer";
import dialogsReducer, {sendMessageCreator, updateNewMessageBodyCreator} from "./dialogs-reducer";


/*export type RootStateType = {
    dialogsPage: DialogsPageType
    profilePage: ProfilePageType
    sidebar: any
    usersPage: UsersPageType
}*/

/*export type StoreType = {
    _state: RootStateType
    _callSubscriber: (state: RootStateType) => void
    getState: () => RootStateType
    subscribe: (observer: (state: RootStateType) => void) => void
    dispatch: (action: ActionsTypes) => void
}*/

/*let store: StoreType = {
    _state: {
        dialogsPage: {
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
        },
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesAmount: 5},
                {id: 2, message: 'Hi, its my first post', likesAmount: 11},
                {id: 2, message: 'Blabla', likesAmount: 11},
                {id: 2, message: 'Dada', likesAmount: 11},
            ],
            newPostText: 'it-kamasutra.com'
        },
        sidebar: {}
    },
    _callSubscriber(state) {

    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer; //наблюдатель, паттерн observer
    },

    /!*    addPost() {
            let newPost: PostsType = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesAmount: 0
            }
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state)
        },
        updateNewPostText(newText: string) {
            this._state.profilePage.newPostText = newText;
            this._callSubscriber(this._state);
        },
        addMessage() {
            let newMessage: MessagesType = {
                id: 3,
                message: this._state.dialogsPage.newMessageBody
            }
            this._state.dialogsPage.messages.push(newMessage);
            this._state.dialogsPage.newMessageBody = ''
            this._callSubscriber(this._state);
        },
        updateNewMessageText(newText: string) {
            this._state.dialogsPage.newMessageBody = newText;
            this._callSubscriber(this._state)
        },*!/

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
}*/

/*export default store;*/


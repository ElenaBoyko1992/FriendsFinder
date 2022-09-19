import React from 'react';
import './index.css';
import state, {subscribe} from "./redux/state";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addMessage, addPost, RootStateType, updateNewMessageText, updateNewPostText} from './redux/state'

let rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <App state={state} addPost={addPost} updateNewPostText={updateNewPostText} addMessage={addMessage}
             updateNewMessageText={updateNewMessageText}/>,
        document.getElementById('root')
    );
};


rerenderEntireTree(state);

subscribe(rerenderEntireTree)

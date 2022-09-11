import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {DialogsPageType, ProfilePageType} from './App';
import {addPost} from './redux/state'

export let rerenderEntireTree = (state: any) => {
    ReactDOM.render(
        <App state={state} addPost={addPost}/>,
        document.getElementById('root')
    );
};




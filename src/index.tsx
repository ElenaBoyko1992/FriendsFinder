import React from 'react';
import './index.css';
import store from "./redux/redux-store";
import {RootStateType} from "./redux/store";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


let rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <App state={state} dispatch={store.dispatch.bind(store)} store={store}/>,
        document.getElementById('root')
    );
};


rerenderEntireTree(store.getState());

store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
})

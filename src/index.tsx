import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import SamuraiJSApp from "../src/App";


/*let rerenderEntireTree = (state: RootStateType) => {*/

ReactDOM.render(
    <SamuraiJSApp/>,
    document.getElementById('root')
);
/*
};
rerenderEntireTree(store.getState());
*/

/*store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
})*/ //для архива


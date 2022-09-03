import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";

export type MessagesType = {
    id: number
    message: string
}

export type DialogsType = {
    id: number
    name: string
}

export type PostsType = {
    id: number
    message: string
    likesAmount: number
}

type AppPropsType = {
    messages: Array<MessagesType>
    dialogs: Array<DialogsType>
    posts: Array<PostsType>
}


const App = (props: AppPropsType) => {
    const returnDialogs = () => {
        return (
            <Dialogs dialogs={props.dialogs} messages={props.messages}/>
        )
    }

    const returnProfile = () => {
        return (
            <Profile posts = {props.posts}/>
        )
    }

        return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Route path={'/dialogs'} component={returnDialogs}/>
                    <Route path={'/profile'} component={returnProfile}/>
                    <Route path={'/news'} component={News}/>
                    <Route path={'/music'} component={Music}/>
                    <Route path={'/settings'} component={Settings}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

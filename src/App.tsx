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

export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}
export type PostsType = {
    id: number
    message: string
    likesAmount: number
}
export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
}
export type ProfilePageType = {
    posts: Array<PostsType>
}

type AppPropsType = {
    state: {
        dialogsPage: DialogsPageType
        profilePage: ProfilePageType
    }
    addPost: (postMessage: string) => void
}

const App = (props: AppPropsType) => {

    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <div className={'app-wrapper-content'}>

                    {/* <Route path={'/dialogs'} component={Dialogs}/> применять при передаче компоненты без пропсов
                    <Route path={'/profile'} component={Profile}/> применять при передаче компоненты без пропсов*/}

                    <Route path={'/dialogs'} render={() => <Dialogs
                        state={props.state.dialogsPage}/>}/> {/*применять при передаче компоненты c пропсами*/}
                    <Route path={'/profile'} render={() => <Profile
                        state={props.state.profilePage}
                        addPost={props.addPost}
                    />}/> {/*применять при передаче компоненты c пропсами*/}

                    <Route path={'/news'} component={News}/>
                    <Route path={'/music'} component={Music}/>
                    <Route path={'/settings'} component={Settings}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersСontainer";
import ProfileContainer from "./components/Profile/ProfileContainer";

const App = () => {

    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <div className={'app-wrapper-content'}>

                    {/* <Route path={'/dialogs'} component={Dialogs}/> применять при передаче компоненты без пропсов
                    <Route path={'/profile'} component={Profile}/> применять при передаче компоненты без пропсов*/}

                    <Route path={'/dialogs'}
                           render={() => <DialogsContainer/>}/> {/*применять при передаче компоненты c пропсами*/}
                    <Route path={'/profile'}
                           render={() => <ProfileContainer/>}/> {/*применять при передаче компоненты c пропсами*/}
                    <Route path={'/users'}
                           render={() => <UsersContainer/>}/>

                    {/*                    <Route path={'/news'} component={News}/>
                    <Route path={'/music'} component={Music}/>
                    <Route path={'/settings'} component={Settings}/>*/}
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;


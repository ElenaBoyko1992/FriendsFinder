import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersСontainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";

const App = () => {

    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <HeaderContainer/>
                <Navbar/>
                <div className={'app-wrapper-content'}>

                    {/* <Route path={'/dialogs'} component={Dialogs}/> применять при передаче компоненты без пропсов
                    <Route path={'/profile'} component={Profile}/> применять при передаче компоненты без пропсов*/}

                    <Route path={'/dialogs'}
                           render={() => <DialogsContainer/>}/> {/*применять при передаче компоненты c пропсами*/}
                    <Route path={'/profile/:userId?'} //указываем, что в адресе после profile может также прийти userId.
                        //"?" указывает на то, что параметр :userId является опциональным
                           render={() => <ProfileContainer/>}/> {/*применять при передаче компоненты c пропсами*/}
                    <Route path={'/users'}
                           render={() => <UsersContainer/>}/>
                    <Route path={'/login'}
                           render={() => <LoginPage/>}/>

                    {/*                    <Route path={'/news'} component={News}/>
                    <Route path={'/music'} component={Music}/>
                    <Route path={'/settings'} component={Settings}/>*/}
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;


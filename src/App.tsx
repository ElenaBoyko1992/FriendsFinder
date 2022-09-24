import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Profile, {ProfilePageType} from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import Dialogs, {DialogsPageType} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";


type AppPropsType = {
    state: {
        dialogsPage: DialogsPageType
        profilePage: ProfilePageType
    }
    dispatch: (action: any) => void
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
                        dialogsPage={props.state.dialogsPage}
                        dispatch={props.dispatch}
                    />}/> {/*применять при передаче компоненты c пропсами*/}
                    <Route path={'/profile'} render={() => <Profile
                        profilePage={props.state.profilePage}
                        dispatch={props.dispatch}
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

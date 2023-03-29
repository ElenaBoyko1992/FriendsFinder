import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersСontainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import store, {ReduxStoreType} from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";

class App extends React.Component<AppPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (

            <div className={'app-wrapper'}>
                <HeaderContainer/>
                <Navbar/>
                <div className={'app-wrapper-content'}>

                    {/* <Route path={'/dialogs'} component={Dialogs}/> применять при передаче компоненты без пропсов
                    <Route path={'/profile'} component={Profile}/> применять при передаче компоненты без пропсов*/}

                    <Route path={'/dialogs'}
                           render={() => <DialogsContainer/>}/> {/*применять при передаче компоненты c пропсами*/}
                    <Route
                        path={'/profile/:userId?'} //указываем, что в адресе после profile может также прийти userId.
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

        );
    }

}

const mapStateToProps = (state: ReduxStoreType): MapStatePropsType => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}
export default SamuraiJSApp;
//types
type MapStatePropsType = {
    initialized: boolean
}
type MapDispatchPropsType = {
    initializeApp: () => void
}
type AppPropsType = MapStatePropsType & MapDispatchPropsType


import React, {Suspense} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersСontainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "redux/app-reducer";
import store, {ReduxStoreType} from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";
import s from '../src/components/common/CommonStyles.module.css'

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

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
                    <Suspense fallback={<Preloader/>}>

                        <Switch>
                            <Route exact path={'/'}
                                   render={() =>
                                       <Redirect to={'/profile'}/>}/>
                            <Route
                                path={'/profile/:userId?'} //указываем, что в адресе после profile может также прийти userId.
                                //"?" указывает на то, что параметр :userId является опциональным
                                render={() => <ProfileContainer/>}/>
                            <Route path={'/dialogs'}
                                   render={() =>
                                       <DialogsContainer/>}/>
                            <Route path={'/users'}
                                   render={() => <UsersContainer/>}/>
                            <Route path={'/login'}
                                   render={() => <LoginPage/>}/>
                            <Route path={'*'}
                                   render={() => <div className={s.notFoundPage}>404 NOT FOUND</div>}/>
                            {/*                    <Route path={'/news'} component={News}/>
                    <Route path={'/music'} component={Music}/>
                    <Route path={'/settings'} component={Settings}/>*/}
                        </Switch>
                    </Suspense>
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
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
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


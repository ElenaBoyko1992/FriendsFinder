import React from 'react';
import s from './Header.module.css';
import commonStyles from '../common/CommonStyles.module.css';
import {NavLink} from "react-router-dom";
import logo from "../../assets/images/icons8-friend-64.png";
import {HeaderPropsType} from "./HeaderContainer";

const Header = (props: HeaderPropsType) => {

    return (
        <header className={s.headerWrapper}>
            <div className={s.header}>
                <div className={s.logo}>
                    <img src={logo} alt=""/>
                    <span>Friends Finder</span>
                </div>
                <div>
                    {props.isAuth &&
                        <div className={s.loginBlock}>
                            <span>{props.login}</span>
                            <button onClick={props.logout} className={commonStyles.button}>Log out</button>
                        </div>
                    }
                    {/*{props.isAuth && <img src={props.userAvatar || userPhoto} alt=""/>}*/}
                </div>
            </div>
        </header>
    )
}

export default Header;
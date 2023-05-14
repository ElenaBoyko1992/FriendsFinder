import React, {useState} from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import rightArrow from '../../assets/images/right-triangle-svgrepo-com.png'
import leftArrow from '../../assets/images/left-triangle-svgrepo-com.svg'

const Navbar = () => {
    let [menuIsOpen, setMenuIsOpen] = useState(true);
    const onBurgerBtnClick = () => {
        setMenuIsOpen(!menuIsOpen)
    };
    return (
        <nav className={s.nav}>
            <div className={menuIsOpen ? `${s.activeItems} ${s.items}` : s.items}>
                <div className={`${s.item} ${s.active}`}>
                    <NavLink to={'/profile'} activeClassName={s.activeLink}>Profile</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to={'/dialogs'} activeClassName={s.activeLink}>Messages</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to={'/users'} activeClassName={s.activeLink}>Users</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to={'/news'} activeClassName={s.activeLink}>News</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to={'/music'} activeClassName={s.activeLink}>Music</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to={'/settings'} activeClassName={s.activeLink}>Settings</NavLink>
                </div>
            </div>
            <button className={s.button} onClick={onBurgerBtnClick}>
                <img style={{width: '15px'}} src={menuIsOpen ? leftArrow : rightArrow} alt=""/>
            </button>

        </nav>
    )
}

export default Navbar;
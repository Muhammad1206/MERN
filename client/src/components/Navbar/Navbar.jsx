import React, { useContext } from 'react';
import style from './Navbar.module.css'
import {AuthContext} from '../../context/AuthContext'
import {NavLink, useHistory} from 'react-router-dom';
import logo from '../assets/img/avatar.png';


export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext)
const logoutHandler = event => {
  event.preventDefault();
  auth.logout()
  history.push('/')
}
    return (
        <nav>
        <div className="nav-wrapper green accent-4">
          <NavLink to="/" className={style.avatarContainer}>
            <img src={logo} alt="Logo Amazon" className={style.avatar}/>
          </NavLink>
          <ul id="nav-mobile" className="right hide-on-med-and-down" >
            <li><NavLink to="/create" className={style.pagesLink}>Создать</NavLink></li>
            <li><NavLink to="/links" className={style.pagesLink}>Ссылки</NavLink></li>
            <li><a href="/" onClick={logoutHandler} className={style.pagesLink}>Выйти</a></li>
          </ul>
        </div>
      </nav>
    )
}

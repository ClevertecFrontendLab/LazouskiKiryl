import { Link } from 'react-router-dom';

import avatar from '../../assets/images/avatar.png';
import logo from '../../assets/images/logo.png';
import { BurgerMenu } from '../burger-menu';

import cl from './header.module.scss';

export const Header = () => (
  <header className={cl.header}>
    <div className={cl.info}>
      <Link className={cl.logoLink} to='/'>
        <img className={cl.logo} src={logo} alt='logo' />
      </Link>
      <BurgerMenu />
      <h3 className={cl.title}>Библиотека</h3>
    </div>
    <div className={cl.user}>
      <p className={cl.greeting}>Привет, Иван!</p>
      <img className={cl.avatar} src={avatar} alt='avatar' />
    </div>
  </header>
);

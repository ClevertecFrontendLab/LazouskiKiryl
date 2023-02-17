import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { Menu } from '../menu';

import cl from './burger-menu.module.scss';

export const BurgerMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      const target = e.target as Node;

      if (isMenuOpen && !buttonRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', outsideClickHandler);

    return () => {
      document.removeEventListener('click', outsideClickHandler);
    };
  }, [isMenuOpen]);

  const handleToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  return (
    <div className={cl.burgerMenu}>
      <div
        data-test-id='button-burger'
        className={classNames(cl.button, { [cl.active]: isMenuOpen })}
        ref={buttonRef}
        onClick={handleToggle}
        aria-hidden='true'
      >
        <span className={cl.buttonLine} />
        <span className={cl.buttonLine} />
        <span className={cl.buttonLine} />
      </div>
      <div
        data-test-id='burger-navigation'
        className={classNames(cl.menu, { [cl.menu_hidden]: !isMenuOpen })}
        ref={menuRef}
      >
        <div className={cl.menuSection}>
          <Menu testId='burger' onClose={handleClose} />
        </div>
        <div className={classNames(cl.menuSection, cl.userMenu)}>
          <h3 className={cl.userMenuItem}>Профиль</h3>
          <h3 className={cl.userMenuItem}>Выход</h3>
        </div>
      </div>
    </div>
  );
};

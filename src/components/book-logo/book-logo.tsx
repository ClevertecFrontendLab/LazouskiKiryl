import { FC } from 'react';
import classNames from 'classnames';

import catIcon from '../../assets/icons/cat.svg';

import cl from './book-logo.module.scss';

interface BookLogoProps {
  logoSrc?: string;
  borderRadius?: 'small' | 'middle';
}

export const BookLogo: FC<BookLogoProps> = ({ logoSrc = null, borderRadius = 'middle' }) => {
  const hasLogo: boolean = logoSrc !== null;

  const logo = hasLogo ? logoSrc : catIcon;

  return (
    <div
      className={classNames(cl.logo, { [cl.withoutLogo]: !hasLogo, [cl.smallBorderRadius]: borderRadius === 'small' })}
      style={{ backgroundImage: `url(${logo})` }}
    />
  );
};

import { FC } from 'react';
import classNames from 'classnames';

import catIcon from '../../assets/icons/cat.svg';

import cl from './book-logo.module.scss';

interface BookLogoProps {
  logoSrc: string | null;
  borderRadius?: 'small' | 'middle';
}

export const BookLogo: FC<BookLogoProps> = ({ logoSrc = null, borderRadius = 'middle' }) => {
  const logoUrl = logoSrc ? `https://strapi.cleverland.by${logoSrc}` : catIcon;

  return (
    <div
      className={classNames(cl.logo, { [cl.withoutLogo]: !logoSrc, [cl.smallBorderRadius]: borderRadius === 'small' })}
      style={{ backgroundImage: `url(${logoUrl})` }}
    />
  );
};

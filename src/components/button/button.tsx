import { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';

import cl from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'large';
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = ({ text, variant = 'primary', size = 'small', fullWidth = false, ...props }) => (
  <button
    className={classNames(cl.button, {
      [cl.secondary]: variant === 'secondary',
      [cl.large]: size === 'large',
      [cl.fullWidth]: fullWidth,
    })}
    type='button'
    {...props}
  >
    {text}
  </button>
);

import { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';

import { ReactComponent as GridIcon } from '../../assets/icons/grid-icon.svg';
import { ReactComponent as ListIcon } from '../../assets/icons/list-icon.svg';

import cl from './icon-button.module.scss';

const icons = {
  grid: GridIcon,
  list: ListIcon,
};

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconType: 'grid' | 'list';
  active?: boolean;
}

export const IconButton: FC<IconButtonProps> = ({ iconType, active = false, ...props }) => {
  const Icon = icons[iconType];

  return (
    <button className={classNames(cl.iconButton, { [cl.active]: active })} type='button' {...props}>
      <Icon />
    </button>
  );
};

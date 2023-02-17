import { ReactComponent as AscSortIcon } from '../../assets/icons/asc-sort-icon.svg';

import cl from './sort-button.module.scss';

export const SortButton = () => (
  <button className={cl.sortButton} type='button'>
    <AscSortIcon className={cl.icon} />
    <span className={cl.text}>По рейтингу</span>
  </button>
);

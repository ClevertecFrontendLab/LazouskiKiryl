import { ReactComponent as AscSortIcon } from '../../assets/icons/asc-sort-icon.svg';
import { ReactComponent as DescSortIcon } from '../../assets/icons/desc-sort-icon.svg';
import { useAppDispatch } from '../../store/hooks/use-app-dispatch';
import { useAppSelector } from '../../store/hooks/use-app-selector';
import { changeSorting } from '../../store/slices/books-slice';
import { Sorting } from '../../types/other';

import cl from './sort-button.module.scss';

export const SortButton = () => {
  const sorting = useAppSelector((state) => state.books.sorting);
  const dispatch = useAppDispatch();

  const handleChangeSorting = () => {
    dispatch(changeSorting());
  };

  return (
    <button className={cl.sortButton} type='button' onClick={handleChangeSorting}>
      {sorting === Sorting.DESC ? <DescSortIcon className={cl.icon} /> : <AscSortIcon className={cl.icon} />}
      <span className={cl.text}>По рейтингу</span>
    </button>
  );
};

import { FC, FormEvent } from 'react';
import classNames from 'classnames';

import closeIcon from '../../assets/icons/close-icon.svg';
import searchIcon from '../../assets/icons/search-icon.svg';
import { useAppDispatch } from '../../store/hooks/use-app-dispatch';
import { useAppSelector } from '../../store/hooks/use-app-selector';
import { setSearchQuery } from '../../store/slices/books-slice';

import cl from './search.module.scss';

interface SearchProps {
  searching: boolean;
  setSearching: (searcing: boolean) => void;
}

export const Search: FC<SearchProps> = ({ searching, setSearching }) => {
  const searchQuery = useAppSelector((state) => state.books.searchQuery);
  const dispatch = useAppDispatch();

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.currentTarget.value));
  };

  return (
    <div className={classNames(cl.search, { [cl.searching]: searching })}>
      <button
        data-test-id='button-search-open'
        className={classNames(cl.button, cl.searchButton)}
        type='button'
        onClick={() => setSearching(true)}
      >
        <img src={searchIcon} alt='search' />
      </button>
      <input
        data-test-id='input-search'
        className={cl.input}
        type='text'
        placeholder='Поиск книги или автора…'
        value={searchQuery}
        onChange={handleChange}
      />
      <button
        data-test-id='button-search-close'
        className={classNames(cl.button, cl.closeButton)}
        type='button'
        onClick={() => setSearching(false)}
      >
        <img src={closeIcon} alt='close' />
      </button>
    </div>
  );
};

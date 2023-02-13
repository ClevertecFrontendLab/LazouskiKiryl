import { FC } from 'react';
import classNames from 'classnames';

import closeIcon from '../../assets/icons/close-icon.svg';
import searchIcon from '../../assets/icons/search-icon.svg';

import cl from './search.module.scss';

interface SearchProps {
  searching: boolean;
  setSearching: (searcing: boolean) => void;
}

export const Search: FC<SearchProps> = ({ searching, setSearching }) => (
  <div className={classNames(cl.search, { [cl.searching]: searching })}>
    <button
      data-test-id='button-search-open'
      className={classNames(cl.button, cl.searchButton)}
      type='button'
      onClick={() => setSearching(true)}
    >
      <img src={searchIcon} alt='search' />
    </button>
    <input data-test-id='input-search' className={cl.input} type='text' placeholder='Поиск книги или автора…' />
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

import { FC, useState } from 'react';
import classNames from 'classnames';

import { ViewType } from '../../types/view';
import { IconButton } from '../icon-button';
import { Search } from '../search';
import { SortButton } from '../sort-button';

import cl from './navigation.module.scss';

interface NavigationProps {
  view: ViewType;
  onChangeView: (viewType: ViewType) => void;
}

export const Navigation: FC<NavigationProps> = ({ view, onChangeView }) => {
  const [searching, setSearching] = useState<boolean>(false);

  return (
    <nav className={classNames(cl.navigation, { [cl.searching]: searching })}>
      <div className={cl.leftPanel}>
        <Search searching={searching} setSearching={setSearching} />
        <div className={cl.sortButton}>
          <SortButton />
        </div>
      </div>
      <div className={cl.rightPanel}>
        <IconButton
          data-test-id='button-menu-view-window'
          iconType='grid'
          active={view === 'grid'}
          onClick={() => onChangeView('grid')}
        />
        <IconButton
          data-test-id='button-menu-view-list'
          iconType='list'
          active={view === 'list'}
          onClick={() => onChangeView('list')}
        />
      </div>
    </nav>
  );
};

import chevronIcon from '../../assets/icons/сhevron-icon.svg';

import cl from './crumbs.module.scss';

export const Crumbs = () => (
  <div className={cl.crumbs}>
    <div className={cl.content}>
      <p className={cl.first}>Бизнес книги</p>
      <img className={cl.separator} src={chevronIcon} alt='separator' />
      <p className={cl.second}>Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих</p>
    </div>
  </div>
);

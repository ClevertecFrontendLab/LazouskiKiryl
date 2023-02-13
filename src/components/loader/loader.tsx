import { ReactComponent as LoaderIcon } from '../../assets/icons/loader-icon.svg';

import cl from './loader.module.scss';

export const Loader = () => (
  <div className={cl.overlay}>
    <LoaderIcon className={cl.loader} />
  </div>
);

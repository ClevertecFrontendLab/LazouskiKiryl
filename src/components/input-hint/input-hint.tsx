import { FC, ReactNode } from 'react';
import classNames from 'classnames';

import cl from './input-hint.module.scss';

interface InputHintProps {
  children: ReactNode;
  isError?: boolean;
}

export const InputHint: FC<InputHintProps> = ({ isError = false, children }) => (
  <p data-test-id='hint' className={classNames(cl.hint, { [cl.error]: isError })}>
    {children}
  </p>
);

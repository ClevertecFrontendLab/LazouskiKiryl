import { FC, ReactNode } from 'react';

import { Loader } from '../loader';

import cl from './form-modal.module.scss';

interface FormModalProps {
  title: string;
  subTitle?: string;
  form?: ReactNode;
  footer?: ReactNode;
  isLoading: boolean;
}

export const FormModal: FC<FormModalProps> = ({ title, subTitle, form, footer, isLoading }) => (
  <div className={cl.formModal}>
    <div className={cl.headlines}>
      <h3 className={cl.title}>{title}</h3>
      {subTitle && <p className={cl.subTitle}>{subTitle}</p>}
    </div>
    {form}
    {footer && <div className={cl.footer}>{footer}</div>}
    {isLoading && <Loader />}
  </div>
);

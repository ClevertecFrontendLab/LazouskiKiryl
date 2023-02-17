import { FC } from 'react';
import classNames from 'classnames';

import { ReactComponent as CloseIcon } from '../../assets/icons/close-icon.svg';
import { ReactComponent as SuccessIcon } from '../../assets/icons/success-icon.svg';
import { ReactComponent as WarningIcon } from '../../assets/icons/warning-icon.svg';

import cl from './toast.module.scss';

const toastTypeIcons = {
  warning: WarningIcon,
  success: SuccessIcon,
};

interface ToastProps {
  type: keyof typeof toastTypeIcons;
  message: string;
  onClose?: () => void;
}

export const Toast: FC<ToastProps> = ({ type, message, onClose }) => {
  const Icon = toastTypeIcons[type];

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className={classNames(cl.toast, {
        [cl.toast_success]: type === 'success',
        [cl.toast_warning]: type === 'warning',
      })}
    >
      <Icon className={cl.icon} />
      <p className={cl.message}>{message}</p>
      <CloseIcon className={cl.close} onClick={handleClose} />
    </div>
  );
};

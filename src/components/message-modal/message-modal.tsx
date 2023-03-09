import { FC } from 'react';

import cl from './message-modal.module.scss';

interface MessageModalProps {
  title: string;
  message: string;
  actionComponent?: React.ReactNode;
}

export const MessageModal: FC<MessageModalProps> = ({ title, message, actionComponent }) => (
  <div data-test-id='status-block' className={cl.messageModal}>
    <h4 className={cl.title}>{title}</h4>
    <p className={cl.message}>{message}</p>
    {actionComponent}
  </div>
);

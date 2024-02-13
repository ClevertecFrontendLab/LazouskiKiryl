import { FC } from 'react';
import { Button } from 'antd';

import './action-card.scss';

export type ActionCardType = {
    id: number;
    title: string;
    icon: JSX.Element;
    linkText: string;
};

type ActionCardProps = {
    actionCard: ActionCardType;
};

export const ActionCard: FC<ActionCardProps> = ({ actionCard }) => {
    const { title, icon, linkText } = actionCard;

    return (
        <div className='action-card'>
            <h4 className='action-card-title'>{title}</h4>
            <Button type='link' icon={icon} className='card-link'>
                {linkText}
            </Button>
        </div>
    );
};

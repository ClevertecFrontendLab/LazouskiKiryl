import { Button } from 'antd';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';

import './footer.scss';

export const Footer = () => (
    <footer className='footer'>
        <Button type='link' size='large' ghost className='reviews'>
            Смотреть отзывы
        </Button>
        <div className='download-card'>
            <div className='download-card__content'>
                <h3 className='download-card__title'>Скачать на телефон </h3>
                <p className='download-card__description'>Доступно в PRO-тарифе</p>
            </div>
            <div className='download-card__actions'>
                <Button type='text' size='middle' icon={<AndroidFilled />} ghost>
                    Android OS
                </Button>
                <Button type='text' size='middle' icon={<AppleFilled />} ghost>
                    Apple iOS
                </Button>
            </div>
        </div>
    </footer>
);

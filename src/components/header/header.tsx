import { Button } from 'antd';
import { useDevice } from '@hooks/use-device-hook';
import { SettingOutlined } from '@ant-design/icons';

import './header.scss';

export const Header = () => {
    const { isMobile } = useDevice();

    return (
        <header className='header'>
            <p className='breadcrumb'>Главная</p>
            <div className='header-content'>
                <h2 className='welcome-message'>
                    Приветствуем тебя в CleverFit — приложении,
                    <br />
                    которое поможет тебе добиться своей мечты!
                </h2>
                <Button
                    type={isMobile ? 'default' : 'text'}
                    size='middle'
                    shape={isMobile ? 'circle' : 'default'}
                    className='settings'
                    icon={<SettingOutlined className='settings-icon' />}
                >
                    {!isMobile && 'Настройки'}
                </Button>
            </div>
        </header>
    );
};

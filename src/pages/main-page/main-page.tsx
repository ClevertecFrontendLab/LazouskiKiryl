import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import cl from 'classnames';
import { ActionCard } from '@components/action-card';
import { ActionCardType } from '@components/action-card/action-card';
import { Footer } from '@components/footer';
import { Header } from '@components/header';
import { ExitIcon } from '@components/icons/exit-icon';
import { useDevice } from '@hooks/use-device-hook';
import {
    CalendarTwoTone,
    HeartTwoTone,
    IdcardOutlined,
    IdcardTwoTone,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyTwoTone,
} from '@ant-design/icons';

import logo from './images/logo.svg';
import smallLogo from './images/small-logo.svg';

import './main-page.scss';

const { Content, Sider } = Layout;

const actionCards: ActionCardType[] = [
    {
        id: 0,
        title: 'Расписать тренировки',
        icon: <HeartTwoTone twoToneColor={['#2f54eb;', '#2f54eb;']} />,
        linkText: 'Тренировки',
    },
    {
        id: 1,
        title: 'Назначить календарь',
        icon: <CalendarTwoTone twoToneColor={['#2f54eb;', '#2f54eb;']} />,
        linkText: 'Календарь',
    },
    {
        id: 2,
        title: 'Заполнить профиль',
        icon: <IdcardOutlined />,
        linkText: 'Профиль',
    },
];

const menuItems = [
    {
        key: '0',
        icon: <CalendarTwoTone twoToneColor={['#061178', '#061178']} />,
        label: 'Календарь',
        className: 'main-menu-item',
        style: { paddingLeft: 0 },
    },
    {
        key: '1',
        icon: <HeartTwoTone twoToneColor={['#061178', '#061178']} />,
        label: 'Тренировки',
        className: 'main-menu-item',
        style: { paddingLeft: 0 },
    },
    {
        key: '2',
        icon: <TrophyTwoTone twoToneColor={['#061178', '#061178']} />,
        label: 'Достижения',
        className: 'main-menu-item',
        style: { paddingLeft: 0 },
    },
    {
        key: '3',
        icon: <IdcardTwoTone twoToneColor={['#061178', '#ffffff']} />,
        label: 'Профиль',
        className: 'main-menu-item',
        style: { paddingLeft: 0 },
    },
];

const exitMenuItems = [
    {
        key: '0',
        icon: <ExitIcon />,
        label: 'Выход',
        className: 'exit-menu-item',
        style: { paddingLeft: 0 },
    },
];

export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { isTablet } = useDevice();

    const toggleCollapsed = () => setCollapsed(!collapsed);

    return (
        <Layout className='main-page'>
            <Sider
                collapsible
                collapsed={collapsed}
                trigger={null}
                theme='light'
                width={isTablet ? 106 : 208}
                collapsedWidth={isTablet ? 0 : 64}
                className='main-page__sider'
            >
                <div className={cl('logo__wrapper', { logo__wrapper_collapsed: collapsed })}>
                    <img src={collapsed ? smallLogo : logo} className='logo' />
                </div>
                <div className='main-page__menu'>
                    <Menu mode='inline' items={menuItems} className='main-page__main-menu' />
                    <Menu mode='inline' selectable={false} items={exitMenuItems} />
                </div>
                <button
                    className='sider-switcher'
                    data-test-id={isTablet ? 'sider-switch-mobile' : 'sider-switch'}
                    onClick={toggleCollapsed}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </button>
            </Sider>
            <Layout className='page'>
                <Header />
                <Content className='content'>
                    <div className='card'>
                        <div className='possibilities'>
                            <p>С CleverFit ты сможешь:</p>
                            <p>
                                — планировать свои тренировки на календаре, выбирая тип и уровень
                                нагрузки
                            </p>
                            <p>
                                — отслеживать свои достижения в разделе статистики, сравнивая свои
                                результаты с нормами и рекордами;
                            </p>
                            <p>
                                — создавать свой профиль, где ты можешь загружать свои фото, видео и
                                отзывы о тренировках;
                            </p>
                            <p>
                                — выполнять расписанные тренировки для разных частей тела, следуя
                                подробным инструкциям и советам профессиональных тренеров.
                            </p>
                        </div>
                    </div>
                    <div className='card card-title'>
                        <h3>
                            CleverFit — это не просто приложение, а твой личный помощник в&nbsp;мире
                            фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                        </h3>
                    </div>
                    <div className='action-cards'>
                        {actionCards.map((card) => (
                            <ActionCard key={card.id} actionCard={card} />
                        ))}
                    </div>
                </Content>
                <Footer />
            </Layout>
        </Layout>
    );
};

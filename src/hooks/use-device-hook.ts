import { useEffect, useState } from 'react';

const MAX_MOBILE_WIDTH = 480;
const MAX_TABLET_WIDTH = 768;

export const useDevice = () => {
    const [width, setWidth] = useState(window.innerWidth);

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);

        return () => window.removeEventListener('resize', handleWindowSizeChange);
    }, []);

    const isMobile = width <= MAX_MOBILE_WIDTH;
    const isTablet = width <= MAX_TABLET_WIDTH;
    const isDesktop = width > MAX_TABLET_WIDTH;

    return { isMobile, isTablet, isDesktop };
};

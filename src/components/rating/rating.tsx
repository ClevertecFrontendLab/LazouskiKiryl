import { FC } from 'react';

import emptyStarIcon from '../../assets/icons/empty-star.svg';
import starIcon from '../../assets/icons/star.svg';

import cl from './rating.module.scss';

interface RatingProps {
  value: number;
  maxValue?: number;
}

export const Rating: FC<RatingProps> = ({ value, maxValue = 5 }) => {
  const createStars = () => {
    const roundedValue = Math.round(value);
    const stars = [];

    for (let i = 0; i < maxValue; i++) {
      const icon = i < roundedValue ? starIcon : emptyStarIcon;
      const star = <img className={cl.star} key={i} src={icon} alt='rating star' />;

      stars.push(star);
    }

    return stars;
  };

  return <div className={cl.rating}>{createStars()}</div>;
};

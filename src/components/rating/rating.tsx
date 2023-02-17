import { FC } from 'react';
import classNames from 'classnames';

import { ReactComponent as EmptyStarIcon } from '../../assets/icons/star/empty-star-icon.svg';
import { ReactComponent as FullStarIcon } from '../../assets/icons/star/full-star-icon.svg';

import cl from './rating.module.scss';

const MAX_VALUE = 5;

interface RatingProps {
  value: number;
  size?: 'small' | 'medium' | 'large';
}

export const Rating: FC<RatingProps> = ({ value, size = 'medium' }) => {
  const createStars = () => {
    const roundedValue = Math.round(value);
    const stars = [];

    for (let i = 0; i < MAX_VALUE; i++) {
      const StarIcon = i < roundedValue ? FullStarIcon : EmptyStarIcon;

      stars.push(<StarIcon className={cl.star} key={i} />);
    }

    return stars;
  };

  return (
    <div className={classNames(cl.rating, { [cl.small]: size === 'small', [cl.large]: size === 'large' })}>
      <div className={cl.stars}>{createStars()}</div>
    </div>
  );
};

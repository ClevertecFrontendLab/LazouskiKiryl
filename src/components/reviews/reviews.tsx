import { FC, Fragment, useState } from 'react';
import classNames from 'classnames';

import downArrowIcon from '../../assets/icons/down-arrow-icon.svg';
import emptyStarIcon from '../../assets/icons/empty-star.svg';
import starIcon from '../../assets/icons/star.svg';
import reviewAvatar from '../../assets/images/review-avatar.png';
import { reviews } from '../../mock-data/reviews';
import { Comment } from '../../types/book';
import { Button } from '../button';

import cl from './reviews.module.scss';

interface ReviewsProps {
  comments?: Comment[] | null;
}

export const Reviews: FC<ReviewsProps> = ({ comments }) => {
  const [showReviews, setShowReviews] = useState<boolean>(true);

  const commentsCount = comments ? comments.length : 0;

  return (
    <section className={cl.reviews}>
      <div className={cl.header}>
        <h5 className={cl.title}>Отзывы</h5>
        <span className={cl.count}>{commentsCount}</span>
        <button
          data-test-id='button-hide-reviews'
          className={classNames(cl.showButton, { [cl.showButton_close]: showReviews })}
          type='button'
          onClick={() => setShowReviews(!showReviews)}
        >
          <img src={downArrowIcon} alt='search' />
        </button>
      </div>
      {showReviews && (
        <Fragment>
          <div className={cl.divider} />
          <div className={cl.content}>
            {reviews.map((review) => (
              <div className={cl.review} key={review.id}>
                <div className={cl.reviewHeader}>
                  <img className={cl.reviewAvatar} src={reviewAvatar} alt='avatar' />
                  <div className={cl.reviewInformation}>
                    <p>{review.name}</p>
                    <p>{review.date}</p>
                  </div>
                </div>
                <div className={cl.reviewRating}>
                  <img className={cl.star} src={starIcon} alt='star' />
                  <img className={cl.star} src={starIcon} alt='star' />
                  <img className={cl.star} src={starIcon} alt='star' />
                  <img className={cl.star} src={starIcon} alt='star' />
                  <img className={cl.star} src={emptyStarIcon} alt='star' />
                </div>
                {review.comment && <div className={cl.reviewContent}>{review.comment}</div>}
              </div>
            ))}
          </div>
        </Fragment>
      )}

      <div data-test-id='button-rating' className={cl.reviewButton}>
        <Button text='Оценить книгу' size='large' fullWidth={true} />
      </div>
    </section>
  );
};

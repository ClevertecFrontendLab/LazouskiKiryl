import { FC, Fragment, useState } from 'react';
import classNames from 'classnames';

import cat from '../../assets/icons/cat.svg';
import { ReactComponent as DownIcon } from '../../assets/icons/down-arrow-icon.svg';
import { API_HOST } from '../../constants/constants';
import { Comment } from '../../types/book';
import { Button } from '../button';
import { Rating } from '../rating';

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
        {comments && (
          <button
            data-test-id='button-hide-reviews'
            className={classNames(cl.showButton, { [cl.showButton_close]: showReviews })}
            type='button'
            onClick={() => setShowReviews(!showReviews)}
          >
            <DownIcon className={cl.showButtonIcon} />
          </button>
        )}
      </div>
      {comments && showReviews && (
        <Fragment>
          <div className={cl.divider} />
          <div className={cl.content}>
            {comments.map((comment) => (
              <div className={cl.review} key={comment.id}>
                <div className={cl.reviewHeader}>
                  <img
                    className={cl.reviewAvatar}
                    src={comment.user.avatarUrl ? `${API_HOST}${comment.user.avatarUrl}` : cat}
                    alt='avatar'
                  />
                  <div className={cl.reviewInformation}>
                    <p>{`${comment.user.firstName} ${comment.user.lastName}`}</p>
                    <p>{comment.createdAt}</p>
                  </div>
                </div>
                <div className={cl.reviewRating}>
                  <Rating value={comment.rating} size='large' />
                </div>
                {comment.text && <div className={cl.reviewContent}>{comment.text}</div>}
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

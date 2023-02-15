import { useState } from 'react';
import { useParams } from 'react-router-dom';

import emptyStarIcon from '../../assets/icons/empty-star.svg';
import starIcon from '../../assets/icons/star.svg';
import { BookLogo } from '../../components/book-logo';
import { BookSwiper } from '../../components/book-swiper';
import { Button } from '../../components/button';
import { Crumbs } from '../../components/crumbs';
import { Loader } from '../../components/loader';
import { Reviews } from '../../components/reviews';
import { Toast } from '../../components/toast';
import { bookDetailItems1, bookDetailItems2 } from '../../mock-data/book-detail';
import { useFetchBookQuery } from '../../store/api/books-api';
import { createAuthotsAndIssueYear, createButtonAttributes } from '../../utils/book';

import cl from './book-page.module.scss';

export const BookPage = () => {
  const { bookId } = useParams();
  const { data: book, isLoading, isError } = useFetchBookQuery(String(bookId));
  const [showError, setShowError] = useState(true);

  const createBookLogo = () => {
    if (!book?.images) {
      return <BookLogo logoSrc={null} />;
    }

    if (book.images.length === 1) {
      return <BookLogo logoSrc={book.images[0].url} />;
    }

    return <BookSwiper images={book.images} />;
  };

  return (
    <section className={cl.bookPage}>
      <Crumbs />
      {book && (
        <div className={cl.content}>
          <section className={cl.header}>
            <div className={cl.headerLogo}>{createBookLogo()}</div>
            <div className={cl.headerMain}>
              <h3 className={cl.headerMainTitle}>{book.title}</h3>
              <p className={cl.headerMainAuthor}>{createAuthotsAndIssueYear(book)}</p>
              <div className={cl.headerMainButton}>
                <Button size='large' fullWidth={true} {...createButtonAttributes(book)} />
              </div>
            </div>
            <div className={cl.headerAbout}>
              <h5 className={cl.headerAboutTitle}>О книге</h5>
              <p className={cl.headerAboutText}>{book.description}</p>
            </div>
          </section>
          <section className={cl.rating}>
            <h5 className={cl.ratingTitle}>Рейтинг</h5>
            <div className={cl.divider} />
            <div className={cl.ratingContent}>
              <div className={cl.ratingStars}>
                <img className={cl.star} src={starIcon} alt='star' />
                <img className={cl.star} src={starIcon} alt='star' />
                <img className={cl.star} src={starIcon} alt='star' />
                <img className={cl.star} src={starIcon} alt='star' />
                <img className={cl.star} src={emptyStarIcon} alt='star' />
              </div>
              <p className={cl.ratingValue}>4.3</p>
            </div>
          </section>
          <section className={cl.details}>
            <h5 className={cl.detailsTitle}>Подробная информация</h5>
            <div className={cl.divider} />
            <div className={cl.detailsContent}>
              <div className={cl.detailsLeft}>
                {bookDetailItems1.map((detail) => (
                  <div className={cl.detailsItem} key={detail.id}>
                    <p className={cl.detailsItemKey}>{detail.key}</p>
                    <p className={cl.detailsItemValue}>{detail.value}</p>
                  </div>
                ))}
              </div>
              <div className={cl.detailsRight}>
                {bookDetailItems2.map((detail) => (
                  <div className={cl.detailsItem} key={detail.id}>
                    <p className={cl.detailsItemKey}>{detail.key}</p>
                    <p className={cl.detailsItemValue}>{detail.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <Reviews />
        </div>
      )}
      {isLoading && <Loader />}
      {isError && showError && (
        <div className={cl.toast}>
          <Toast
            message='Что-то пошло не так. Обновите страницу через некоторое время.'
            type='warning'
            onClose={() => setShowError(false)}
          />
        </div>
      )}
    </section>
  );
};

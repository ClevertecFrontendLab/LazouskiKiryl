import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { BookLogo } from '../../components/book-logo';
import { BookSwiper } from '../../components/book-swiper';
import { Button } from '../../components/button';
import { Crumbs } from '../../components/crumbs';
import { Loader } from '../../components/loader';
import { Rating } from '../../components/rating';
import { Reviews } from '../../components/reviews';
import { Toast } from '../../components/toast';
import { useFetchBookQuery } from '../../store/api/books-api';
import { Image } from '../../types/book';
import { createAuthotsAndIssueYear, createButtonAttributes, getDetails } from '../../utils/book';

import cl from './book-page.module.scss';

export const BookPage = () => {
  const { bookId } = useParams();
  const { data: book, isLoading, isError } = useFetchBookQuery(String(bookId));
  const [showError, setShowError] = useState(true);

  const showSwiper = book?.images && book.images.length > 1;

  return (
    <section className={cl.bookPage}>
      <Crumbs bookTitle={book ? book.title : ''} />
      {book && (
        <div className={cl.content}>
          <section className={cl.header}>
            <div className={cl.headerLogo}>
              {showSwiper ? (
                <BookSwiper images={book.images as Image[]} />
              ) : (
                <div className={cl.headerLogoImage}>
                  <BookLogo logoSrc={book.images ? book.images[0].url : null} />
                </div>
              )}
            </div>
            <div className={cl.headerMain}>
              <h3 data-test-id='book-title' className={cl.headerMainTitle}>
                {book.title}
              </h3>
              <p className={cl.headerMainAuthor}>{createAuthotsAndIssueYear(book)}</p>
              <div className={cl.headerMainButton}>
                <Button size='large' fullWidth={true} {...createButtonAttributes(book)} />
              </div>
            </div>
            <div className={cl.headerAbout}>
              <h5 className={cl.headerAboutTitle}>?? ??????????</h5>
              <p className={cl.headerAboutText}>{book.description}</p>
            </div>
          </section>
          <section className={cl.rating}>
            <h5 className={cl.ratingTitle}>??????????????</h5>
            <div className={cl.divider} />
            <div className={cl.ratingContent}>
              <Rating value={book.rating ? book.rating : 0} size='large' />
              {book.rating === null ? (
                <span className={cl.ratingNotValue}>?????? ?????? ????????????</span>
              ) : (
                <span className={cl.ratingValue}>{book.rating}</span>
              )}
            </div>
          </section>
          <section className={cl.details}>
            <h5 className={cl.detailsTitle}>?????????????????? ????????????????????</h5>
            <div className={cl.divider} />
            <div className={cl.detailsContent}>
              <div className={cl.detailsLeft}>
                {getDetails(book, 'first').map((detail) => (
                  <div className={cl.detailsItem} key={detail.id}>
                    <p className={cl.detailsItemKey}>{detail.property}</p>
                    <p className={cl.detailsItemValue}>{detail.value}</p>
                  </div>
                ))}
              </div>
              <div className={cl.detailsRight}>
                {getDetails(book, 'second').map((detail) => (
                  <div className={cl.detailsItem} key={detail.id}>
                    <p className={cl.detailsItemKey}>{detail.property}</p>
                    <p className={cl.detailsItemValue}>{detail.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <Reviews comments={book.comments} />
        </div>
      )}
      {isLoading && <Loader />}
      {isError && showError && (
        <div data-test-id='error' className={cl.toast}>
          <Toast
            message='??????-???? ?????????? ???? ??????. ???????????????? ???????????????? ?????????? ?????????????????? ??????????.'
            type='warning'
            onClose={() => setShowError(false)}
          />
        </div>
      )}
    </section>
  );
};

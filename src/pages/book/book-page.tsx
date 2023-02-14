import { useParams } from 'react-router-dom';

import emptyStarIcon from '../../assets/icons/empty-star.svg';
import starIcon from '../../assets/icons/star.svg';
import { BookLogo } from '../../components/book-logo';
import { BookSwiper } from '../../components/book-swiper';
import { Button } from '../../components/button';
import { Crumbs } from '../../components/crumbs';
import { Reviews } from '../../components/reviews';
import { bookDetailItems1, bookDetailItems2 } from '../../mock-data/book-detail';
import { books } from '../../mock-data/books';

import cl from './book-page.module.scss';

export const BookPage = () => {
  const { bookId } = useParams();
  const book = books.find((currentBook) => String(currentBook.id) === bookId);
  const bookImages = book ? book.images : [];

  const createBookLogo = () => {
    if (bookImages.length > 1) {
      return <BookSwiper images={bookImages} />;
    }

    if (bookImages.length === 1) {
      return <BookLogo logoSrc={bookImages[0].src} />;
    }

    return <BookLogo logoSrc={null} />;
  };

  return (
    <section className={cl.bookPage}>
      <Crumbs />
      <div className={cl.content}>
        <section className={cl.header}>
          <div className={cl.headerLogo}>{createBookLogo()}</div>
          <div className={cl.headerMain}>
            <h3 className={cl.headerMainTitle}>
              Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих
            </h3>
            <p className={cl.headerMainAuthor}>Адитья Бхаргава, 2019</p>
            <div className={cl.headerMainButton}>
              <Button text='Забронировать' size='large' fullWidth={true} />
            </div>
          </div>
          <div className={cl.headerAbout}>
            <h5 className={cl.headerAboutTitle}>О книге</h5>
            <p className={cl.headerAboutText}>
              Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то
              решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута,
              изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое
              время? Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А
              грокать алгоритмы — это веселое и увлекательное занятие.
            </p>
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
    </section>
  );
};

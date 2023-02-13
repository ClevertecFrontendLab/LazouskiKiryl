import { FC, useState } from 'react';
import { Pagination, Scrollbar, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';

import { IImage } from '../../types/book';

import './swiper.scss';
import cl from './book-swiper.module.scss';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/scss/thumbs';

interface BookSwiperProps {
  images: IImage[];
}

export const BookSwiper: FC<BookSwiperProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

  return (
    <div className={cl.bookSwiper}>
      <Swiper
        data-test-id='slide-big'
        modules={[Pagination, Thumbs]}
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        breakpoints={{
          1121: {
            pagination: false,
          },
        }}
      >
        {images.map((image) => (
          <SwiperSlide className={cl.mainSlide} key={image.id}>
            <img src={image.src} alt='book' />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        className={cl.thumbsSwiper}
        modules={[Scrollbar]}
        slidesPerView={5}
        spaceBetween={30}
        centerInsufficientSlides={true}
        watchSlidesProgress={true}
        scrollbar={
          images.length > 5
            ? {
                draggable: true,
                hide: true,
                horizontalClass: cl.scrollbar,
              }
            : false
        }
        onSwiper={setThumbsSwiper}
      >
        {images.map((image) => (
          <SwiperSlide data-test-id='slide-mini' className={cl.thumbsSlide} key={image.id}>
            <img src={image.src} alt='book' />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

import bookLogo1 from '../assets/images/book-logo-1.png';
import bookLogo2 from '../assets/images/book-logo-2.png';
import bookLogo3 from '../assets/images/book-logo-3.png';
import { IBook } from '../types/book';

export const books: IBook[] = [
  {
    id: 0,
    title: 'Грокаем алгоритмы. Иллюстрированное пособие для програ...',
    author: 'Адитья Бхаргава, 2019',
    hasLogo: true,
    rating: null,
    status: 'available',
    unavailableUntil: null,
    images: [],
  },
  {
    id: 1,
    title: 'Грокаем алгоритмы. Иллюстрированное ',
    author: 'Адитья Бхаргава, 2019',
    hasLogo: true,
    rating: 4,
    status: 'available',
    unavailableUntil: null,
    images: [
      {
        id: 0,
        src: bookLogo1,
      },
    ],
  },
  {
    id: 2,
    title: 'Грокаем алгоритмы. ',
    author: 'Адитья Бхаргава, 2019',
    hasLogo: true,
    rating: 4,
    status: 'unavailable',
    unavailableUntil: '03.05',
    images: [
      {
        id: 0,
        src: bookLogo1,
      },
      {
        id: 1,
        src: bookLogo2,
      },
      {
        id: 3,
        src: bookLogo3,
      },
      {
        id: 4,
        src: bookLogo1,
      },
      {
        id: 5,
        src: bookLogo2,
      },
      {
        id: 6,
        src: bookLogo3,
      },
    ],
  },
  {
    id: 3,
    title: 'Грокаем алгоритмы. Иллюстрированное пособие для програ...',
    author: 'Адитья Бхаргава, 2019',
    hasLogo: true,
    rating: 4,
    status: 'available',
    unavailableUntil: null,
    images: [
      {
        id: 0,
        src: bookLogo1,
      },
      {
        id: 1,
        src: bookLogo2,
      },
      {
        id: 3,
        src: bookLogo3,
      },
    ],
  },
  {
    id: 4,
    title: 'Грокаем алгоритмы. Иллюстрированное пособие для програ...',
    author: 'Адитья Бхаргава, Патрик Нимейер, 2019',
    hasLogo: true,
    rating: 4,
    status: 'booked',
    unavailableUntil: null,
    images: [
      {
        id: 0,
        src: bookLogo1,
      },
      {
        id: 1,
        src: bookLogo2,
      },
      {
        id: 3,
        src: bookLogo3,
      },
    ],
  },
  {
    id: 5,
    title: 'Грокаем алгоритмы. Иллюстрированное ',
    author: 'Адитья Бхаргава, Патрик Нимейер, 2019',
    hasLogo: false,
    rating: null,
    status: 'unavailable',
    unavailableUntil: '23.04',
    images: [
      {
        id: 0,
        src: bookLogo1,
      },
      {
        id: 1,
        src: bookLogo2,
      },
      {
        id: 3,
        src: bookLogo3,
      },
    ],
  },
  {
    id: 6,
    title: 'Грокаем алгоритмы. ',
    author: 'Адитья Бхаргава, Патрик Нимейер, 2019',
    hasLogo: true,
    rating: 4,
    status: 'available',
    unavailableUntil: null,
    images: [
      {
        id: 0,
        src: bookLogo1,
      },
    ],
  },
  {
    id: 7,
    title: 'Грокаем алгоритмы. Иллюстрированное пособие для програ...',
    author: 'Адитья Бхаргава, Патрик Нимейер, 2019',
    hasLogo: true,
    rating: 4,
    status: 'available',
    unavailableUntil: null,
    images: [],
  },
  {
    id: 8,
    title: 'Грокаем алгоритмы. Иллюстрированное пособие для програ...',
    author: 'Адитья Бхаргава, 2019',
    hasLogo: true,
    rating: 4,
    status: 'available',
    unavailableUntil: null,
    images: [
      {
        id: 0,
        src: bookLogo1,
      },
      {
        id: 1,
        src: bookLogo2,
      },
      {
        id: 3,
        src: bookLogo3,
      },
    ],
  },
  {
    id: 9,
    title: 'Грокаем алгоритмы. Иллюстрированное пособие для програ...',
    author: 'Адитья Бхаргава, 2019',
    hasLogo: false,
    rating: 4,
    status: 'available',
    unavailableUntil: null,
    images: [
      {
        id: 0,
        src: bookLogo1,
      },
      {
        id: 1,
        src: bookLogo2,
      },
      {
        id: 3,
        src: bookLogo3,
      },
    ],
  },
];

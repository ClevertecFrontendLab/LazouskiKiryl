import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';

import chevronIcon from '../../assets/icons/сhevron-icon.svg';
import { useFetchCategoriesQuery } from '../../store/api/books-api';

import cl from './crumbs.module.scss';

interface CrumbsProps {
  bookTitle: string;
}

export const Crumbs: FC<CrumbsProps> = ({ bookTitle }) => {
  const { category: categoryPath } = useParams();
  const { data: categories } = useFetchCategoriesQuery();

  const currentCategory = categories?.find((category) => category.path === categoryPath);
  const categoryName = currentCategory ? currentCategory.name : 'Все книги';

  return (
    <div className={cl.crumbs}>
      <div className={cl.content}>
        <Link to={`/books/${categoryPath}`}>
          <p className={cl.first}>{categoryName}</p>
        </Link>
        <img className={cl.separator} src={chevronIcon} alt='separator' />
        <p className={cl.second}>{bookTitle}</p>
      </div>
    </div>
  );
};

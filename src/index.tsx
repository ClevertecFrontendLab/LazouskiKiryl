import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout';
import { BookPage } from './pages/book';
import { LayoutMainPage } from './pages/layuot-main';
import { MainPage } from './pages/main';
import { TermsPage } from './pages/terms';

import './styles/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route element={<LayoutMainPage />}>
            <Route path='/' element={<Navigate to='/books/all' />} />
            <Route path='/books/:category' element={<MainPage />} />
            <Route path='/terms' element={<TermsPage title='Правила пользования' />} />
            <Route path='/contract' element={<TermsPage title='Договор оферты' />} />
          </Route>
          <Route path='/books/:category/:bookId' element={<BookPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

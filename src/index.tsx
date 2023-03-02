import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthenticationLayout } from './components/auth-layout/authentication-layout';
import { Layout } from './components/layout';
import { LayoutMain } from './components/layuot-main';
import { RoutePath } from './constants/constants';
import { AuthorizationPage } from './pages/authorization';
import { BookPage } from './pages/book';
import { ForgotPasswordPage } from './pages/forgot-password';
import { MainPage } from './pages/main';
import { RegistrationPage } from './pages/registration';
import { TermsPage } from './pages/terms';
import { store } from './store';

import './styles/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route element={<LayoutMain />}>
              <Route path='/' element={<Navigate to='/books/all' />} />
              <Route path='/books/:category' element={<MainPage />} />
              <Route path='/terms' element={<TermsPage title='Правила пользования' />} />
              <Route path='/contract' element={<TermsPage title='Договор оферты' />} />
            </Route>
            <Route path='/books/:category/:bookId' element={<BookPage />} />
          </Route>
          <Route path='/' element={<AuthenticationLayout />}>
            <Route path={RoutePath.registration} element={<RegistrationPage />} />
            <Route path={RoutePath.authorization} element={<AuthorizationPage />} />
            <Route path={RoutePath.forgotPassword} element={<ForgotPasswordPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);

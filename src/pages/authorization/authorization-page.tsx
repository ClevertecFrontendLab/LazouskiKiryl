import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from '../../components/button';
import { Loader } from '../../components/loader';
import { MessageModal } from '../../components/message-modal';
import { RoutePath } from '../../constants/constants';
import { useAuthorizationMutation } from '../../store/api/auth-api';
import { AuthError, AuthorizationRequest } from '../../types/auth';

export const AuthorizationPage = () => {
  const [authorization, { isLoading, isError, error }] = useAuthorizationMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorizationRequest>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<AuthorizationRequest> = (data) => {
    authorization(data);
  };

  if (isError && (error as AuthError).status !== 400) {
    return (
      <MessageModal
        title='Вход не выполнен'
        message='Что-то пошло не так. Попробуйте ещё раз'
        actionComponent={<Button text='повторить' />}
      />
    );
  }

  return (
    <div>
      <h3>Вход в личный кабинет</h3>
      <form data-test-id='auth-form' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='identifier'>Логин</label>
        <input
          type='text'
          {...register('identifier', {
            required: true,
          })}
        />
        {errors.identifier && <p data-test-id='hint'>Поле не может быть пустым</p>}

        <label htmlFor='password'>Пароль</label>
        <input
          type='password'
          {...register('password', {
            required: true,
          })}
        />
        {errors.password && <p data-test-id='hint'>Поле не может быть пустым</p>}

        <Link to={RoutePath.forgotPassword}>Забыли логин или пароль?</Link>
        <button type='submit'>вход</button>
      </form>
      <p>
        Нет учётной записи? <Link to={RoutePath.registration}>Регистрация</Link>
      </p>
      {isLoading && <Loader />}
    </div>
  );
};

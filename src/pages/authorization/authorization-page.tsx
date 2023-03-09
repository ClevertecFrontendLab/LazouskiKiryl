import { useForm } from 'react-hook-form';

import { AuthorizationRequest } from '../../types/auth';

export const AuthorizationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorizationRequest>({
    mode: 'onBlur',
  });

  const onSubmit = () => {};

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

        <a>Забыли логин или пароль?</a>
        <button type='submit'>вход</button>
      </form>
      <p>
        Нет учётной записи? <a>Регистрация</a>
      </p>
    </div>
  );
};

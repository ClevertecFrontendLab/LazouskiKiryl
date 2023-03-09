import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { ForgotPasswordRequest, ResetPasswordRequest } from '../../types/auth';

const SendEmailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordRequest>({
    mode: 'onBlur',
  });

  const onSubmit = () => {};

  return (
    <form data-test-id='send-email-form' onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='identifier'>Email</label>
      <input
        type='text'
        {...register('email', {
          required: true,
        })}
      />
      <p>На это email будет отправлено письмо с инструкциями по восстановлению пароля</p>
      {errors.email && <p>Поле не может быть пустым</p>}
      <button type='submit'>восстановить</button>
    </form>
  );
};

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<ResetPasswordRequest, 'code'>>({
    mode: 'onBlur',
  });

  const onSubmit = () => {};

  return (
    <form data-test-id='reset-password-form' onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='password'>Пароль</label>
      <input
        type='password'
        {...register('password', {
          required: true,
          validate: {
            length: (value) => value.length >= 8,
            capitalLetter: (value) => !!value.match(/[A-Z]/),
            number: (value) => !!value.match(/[0-9]/),
          },
        })}
      />
      <p data-test-id='hint'>Пароль не менее 8 символов, с заглавной буквой и цифрой</p>
      {errors.password && errors.password.type === 'required' && <p data-test-id='hint'>Поле не может быть пустым</p>}
      {errors.password && errors.password.types && <p>{Object.keys(errors.password.types).join(' - ')}</p>}

      <label htmlFor='password'>Повторите пароль</label>
      <input
        type='password'
        {...register('passwordConfirmation', {
          required: true,
          validate: {
            length: (value) => value.length >= 8,
          },
        })}
      />
      {errors.passwordConfirmation && errors.passwordConfirmation.type === 'required' && (
        <p data-test-id='hint'>Поле не может быть пустым</p>
      )}

      <button type='submit'>сохранить изменения</button>
      <p>После сохранения войдите в библиотеку, используя новый пароль</p>
    </form>
  );
};

export const ForgotPasswordPage = () => {
  const [searchParams] = useSearchParams();

  const hasCode = !!searchParams.get('code');

  return (
    <div>
      <h3>Восстановление пароля</h3>
      {hasCode ? <SendEmailForm /> : <ResetPasswordForm />}
      {!hasCode && (
        <p>
          Нет учётной записи? <a>Регистрация</a>
        </p>
      )}
    </div>
  );
};

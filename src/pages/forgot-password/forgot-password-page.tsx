import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { Button } from '../../components/button';
import { Loader } from '../../components/loader';
import { MessageModal } from '../../components/message-modal';
import { RoutePath } from '../../constants/constants';
import { useForgotPasswordMutation, useResetPasswordMutation } from '../../store/api/auth-api';
import { ForgotPasswordRequest, ResetPasswordRequest } from '../../types/auth';

const SendEmailForm = () => {
  const [forgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordRequest>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<ForgotPasswordRequest> = (data) => {
    forgotPassword(data);
  };

  if (isSuccess) {
    <MessageModal
      title='Письмо выслано'
      message='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'
    />;
  }

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
      {isLoading && <Loader />}
    </form>
  );
};

interface ResetPasswordFormProps {
  code: string;
}

type Passwords = Omit<ResetPasswordRequest, 'code'>;

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ code }) => {
  const [resetPassword, { isLoading, isSuccess, isError }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Passwords>({
    mode: 'onBlur',
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Passwords> = (data) => {
    resetPassword({ ...data, code });
  };

  const toAuthorization = () => {
    navigate(RoutePath.authorization);
  };

  if (isSuccess) {
    return (
      <MessageModal
        title='Новые данные сохранены'
        message='Зайдите в личный кабинет, используя свои логин и новый пароль'
        actionComponent={<Button text='вход' onClick={toAuthorization} />}
      />
    );
  }

  if (isError) {
    return (
      <MessageModal
        title='Данные не сохранились'
        message='Что-то пошло не так. Попробуйте ещё раз'
        actionComponent={<Button text='повторить' onClick={() => {}} />}
      />
    );
  }

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
      {isLoading && <Loader />}
    </form>
  );
};

export const ForgotPasswordPage = () => {
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');

  return (
    <div>
      <Link to={RoutePath.authorization}>вход в личный кабинет</Link>
      <h3>Восстановление пароля</h3>
      {code ? <ResetPasswordForm code={code} /> : <SendEmailForm />}
      {!code && (
        <p>
          Нет учётной записи? <Link to={RoutePath.registration}>Регистрация</Link>
        </p>
      )}
    </div>
  );
};

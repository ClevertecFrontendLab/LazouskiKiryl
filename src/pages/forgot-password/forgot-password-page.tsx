import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { Button } from '../../components/button';
import { FormModal } from '../../components/form-modal';
import { Input } from '../../components/input';
import { InputHint } from '../../components/input-hint';
import { MessageModal } from '../../components/message-modal';
import { RoutePath } from '../../constants/constants';
import { useForgotPasswordMutation, useResetPasswordMutation } from '../../store/api/auth-api';
import { ForgotPasswordRequest, ResetPasswordRequest } from '../../types/auth';

const SendEmailForm = () => {
  const [forgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    getValues,
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
    <FormModal
      title='Восстановление пароля'
      form={
        <form data-test-id='send-email-form' onSubmit={handleSubmit(onSubmit)}>
          <Input
            type='text'
            label='Email'
            value={getValues().email}
            isError={!!errors.email}
            {...register('email', {
              required: 'Поле не может быть пустым',
              validate: {
                email: (value) => !!value.match(/[^\s@]+@[^\s@]+\.[^\s@]+/) || 'Введите корректный e-mail',
              },
            })}
          />
          {errors.email && <InputHint isError={true}>{errors.email.message}</InputHint>}
          <InputHint>На это email будет отправлено письмо с инструкциями по восстановлению пароля</InputHint>
          <Button type='submit' text='восстановить' size='large' fullWidth={true} />
        </form>
      }
      footer={
        <p>
          Нет учётной записи? <Link to={RoutePath.registration}>Регистрация</Link>
        </p>
      }
      isLoading={isLoading}
    />
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
    <FormModal
      title='Восстановление пароля'
      form={
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
          {errors.password && errors.password.type === 'required' && (
            <p data-test-id='hint'>Поле не может быть пустым</p>
          )}
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
      }
      isLoading={isLoading}
    />
  );
};

export const ForgotPasswordPage = () => {
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');

  return (
    <div>
      {/* <Link to={RoutePath.authorization}>вход в личный кабинет</Link> */}
      {code ? <ResetPasswordForm code={code} /> : <SendEmailForm />}
    </div>
  );
};

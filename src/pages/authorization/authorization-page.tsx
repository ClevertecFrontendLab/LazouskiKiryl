import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from '../../components/button';
import { FormModal } from '../../components/form-modal';
import { Input } from '../../components/input';
import { InputHint } from '../../components/input-hint';
import { MessageModal } from '../../components/message-modal';
import { RoutePath } from '../../constants/constants';
import { useAuthorizationMutation } from '../../store/api/auth-api';
import { AuthError, AuthorizationRequest } from '../../types/auth';

export const AuthorizationPage = () => {
  const [authorization, { isLoading, isError, error }] = useAuthorizationMutation();

  const {
    register,
    handleSubmit,
    getValues,
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
    <FormModal
      title='Вход в личный кабинет'
      form={
        <form data-test-id='auth-form' onSubmit={handleSubmit(onSubmit)}>
          <Input
            type='text'
            label='Логин'
            value={getValues().identifier}
            isError={!!errors.identifier}
            {...register('identifier', {
              required: 'Поле не может быть пустым',
            })}
          />
          {errors.identifier && <InputHint isError={true}>{errors.identifier.message}</InputHint>}

          <Input
            type='password'
            label='Пароль'
            value={getValues().password}
            isError={!!errors.password}
            {...register('password', {
              required: 'Поле не может быть пустым',
            })}
          />
          {errors.password && <InputHint isError={true}>{errors.password.message}</InputHint>}

          <Link to={RoutePath.forgotPassword}>Забыли логин или пароль?</Link>

          <Button type='submit' text='вход' size='large' fullWidth={true} />
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

import { FC, Fragment, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/button';
import { FormModal } from '../../components/form-modal';
import { Input } from '../../components/input';
import { InputHint } from '../../components/input-hint';
import { MessageModal } from '../../components/message-modal';
import { RoutePath } from '../../constants/constants';
import { useRegistrationMutation } from '../../store/api/auth-api';
import { AuthError, RegistrationRequest } from '../../types/auth';

import cl from './registration-page.module.scss';

type FirstInputs = {
  username: string;
  password: string;
};

type SecondInputs = {
  firstName: string;
  lastName: string;
};

type ThirdInputs = {
  phone: string;
  email: string;
};

interface FirstStepProps {
  onSubmitValues: (values: FirstInputs) => void;
}

interface SecondStepProps {
  onSubmitValues: (values: SecondInputs) => void;
}

interface ThirdStepProps {
  onSubmitValues: (values: ThirdInputs) => void;
}

const FirstStep: FC<FirstStepProps> = ({ onSubmitValues }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FirstInputs>({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const onSubmit: SubmitHandler<FirstInputs> = (data) => {
    onSubmitValues(data);
  };

  return (
    <form data-test-id='register-form' className={cl.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        type='text'
        label='Придумайте логин для входа'
        value={getValues().username}
        isError={!!errors.username}
        {...register('username', {
          required: 'Поле не может быть пустым',
          validate: {
            latin: (value) => !!value.match(/[A-Za-z]/) || 'Используйте для логина латинский алфавит и цифры',
            number: (value) => !!value.match(/[0-9]/) || 'Используйте для логина латинский алфавит и цифры',
          },
        })}
      />

      {errors.username ? (
        <InputHint isError={true}>{errors.username.message}</InputHint>
      ) : (
        <InputHint isError={false}>Используйте для логина латинский алфавит и цифры</InputHint>
      )}

      {/* {errors.username && errors.username.types && <p>{Object.keys(errors.username.types).join(' - ')}</p>} */}

      <Input
        type='password'
        label='Пароль'
        value={getValues().password}
        isError={!!errors.password}
        {...register('password', {
          required: 'Поле не может быть пустым',
          validate: {
            length: (value) => value.length >= 8 || 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
            capitalLetter: (value) =>
              !!value.match(/[A-Z]/) || 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
            number: (value) => !!value.match(/[0-9]/) || 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
          },
        })}
      />
      {errors.password ? (
        <InputHint isError={true}>{errors.password.message}</InputHint>
      ) : (
        <InputHint isError={false}>Пароль не менее 8 символов, с заглавной буквой и цифрой</InputHint>
      )}

      {/* {errors.password && errors.password.types && <p>{Object.keys(errors.password.types).join(' - ')}</p>} */}

      <Button type='submit' text='следующий шаг' size='large' fullWidth={true} />
    </form>
  );
};

const SecondStep: FC<SecondStepProps> = ({ onSubmitValues }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SecondInputs>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<SecondInputs> = (data) => {
    onSubmitValues(data);
  };

  return (
    <form data-test-id='register-form' className={cl.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        type='text'
        label='Имя'
        value={getValues().firstName}
        isError={!!errors.firstName}
        {...register('firstName', {
          required: 'Поле не может быть пустым',
        })}
      />
      {errors.firstName && <InputHint isError={true}>{errors.firstName.message}</InputHint>}

      <Input
        type='text'
        label='Фамилия'
        value={getValues().lastName}
        isError={!!errors.lastName}
        {...register('lastName', {
          required: 'Поле не может быть пустым',
        })}
      />
      {errors.lastName && <InputHint isError={true}>{errors.lastName.message}</InputHint>}

      <Button type='submit' text='последний шаг' size='large' fullWidth={true} />
    </form>
  );
};

const ThirdStep: FC<ThirdStepProps> = ({ onSubmitValues }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ThirdInputs>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<ThirdInputs> = (data) => {
    onSubmitValues(data);
  };

  return (
    <form data-test-id='register-form' className={cl.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        type='text'
        label='Номер телефона'
        value={getValues().phone}
        isError={!!errors.phone}
        {...register('phone', {
          required: 'Поле не может быть пустым',
          validate: {
            phone: (value) => !!value.match(/[A-Za-z]/) || 'В формате +375 (xx) xxx-xx-xx',
          },
        })}
      />

      {errors.phone ? (
        <InputHint isError={true}>{errors.phone.message}</InputHint>
      ) : (
        <InputHint isError={false}>В формате +375 (xx) xxx-xx-xx</InputHint>
      )}

      <Input
        type='text'
        label='E-mail'
        value={getValues().email}
        isError={!!errors.email}
        {...register('email', {
          required: 'Поле не может быть пустым',
          validate: {
            email: (value) => !!value.match(/[^\s@]+@[^\s@]+\.[^\s@]+/) || 'Введите корректный e-mail',
          },
        })}
      />

      {errors.email ? (
        <InputHint isError={true}>{errors.email.message}</InputHint>
      ) : (
        <InputHint isError={false}>В формате +375 (xx) xxx-xx-xx</InputHint>
      )}

      <Button type='submit' text='зарегистрироваться' size='large' fullWidth={true} />
    </form>
  );
};

export const RegistrationPage = () => {
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState<RegistrationRequest>({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const [registration, { isLoading, isSuccess, isError, error }] = useRegistrationMutation();

  const navigate = useNavigate();

  const toAuthorization = () => {
    navigate(RoutePath.authorization);
  };

  const submitFirstStep = (values: FirstInputs) => {
    setFormState((prevState) => ({
      ...prevState,
      ...values,
    }));
    setStep(2);
  };

  const submitSecondStep = (values: SecondInputs) => {
    setFormState((prevState) => ({
      ...prevState,
      ...values,
    }));
    setStep(3);
  };

  const submitThirdStep = (values: ThirdInputs) => {
    registration({ ...formState, ...values });
  };

  if (isSuccess) {
    return (
      <MessageModal
        title='Регистрация успешна'
        message='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'
        actionComponent={<Button text='вход' onClick={toAuthorization} />}
      />
    );
  }

  if (isError && (error as AuthError).status === 400) {
    return (
      <MessageModal
        title='Данные не сохранились'
        message='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.'
        actionComponent={<Button text='назад к регистрации' onClick={() => {}} />}
      />
    );
  }

  if (isError) {
    return (
      <MessageModal
        title='Данные не сохранились'
        message='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз'
        actionComponent={<Button text='повторить' onClick={() => {}} />}
      />
    );
  }

  return (
    <FormModal
      title='Регистрация'
      subTitle={`${step} шаг из 3`}
      form={
        <Fragment>
          {step === 1 && <FirstStep onSubmitValues={submitFirstStep} />}
          {step === 2 && <SecondStep onSubmitValues={submitSecondStep} />}
          {step === 3 && <ThirdStep onSubmitValues={submitThirdStep} />}
        </Fragment>
      }
      footer={
        <p>
          Есть учётная запись? <a>войти</a>
        </p>
      }
      isLoading={isLoading}
    />
  );
};

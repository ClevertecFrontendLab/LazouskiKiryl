import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import classNames from 'classnames';

// import { useRegistrationMutation } from '../../store/api/auth-api';
// import { RegistrationRequest } from '../../types/auth';
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

interface NextStepProps {
  onNextStep: () => void;
}

const FirstStep: FC<NextStepProps> = ({ onNextStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FirstInputs>({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const onSubmit: SubmitHandler<FirstInputs> = () => {
    onNextStep();
  };

  const usernameRequiredError = errors.username && errors.username.type === 'required';
  const passwordRequiredError = errors.password && errors.password.type === 'required';

  return (
    <form data-test-id='register-form' className={cl.form} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='username'>Придумайте логин для входа</label>
      <input
        className={classNames({ [cl.error]: usernameRequiredError })}
        type='text'
        {...register('username', {
          required: true,
          validate: {
            latin: (value) => !!value.match(/[A-Za-z]/),
            number: (value) => !!value.match(/[0-9]/),
          },
        })}
      />
      <p data-test-id='hint'>Используйте для логина латинский алфавит и цифры</p>
      {usernameRequiredError && (
        <p data-test-id='hint' className={cl.errorMessage}>
          Поле не может быть пустым
        </p>
      )}
      {errors.username && errors.username.types && <p>{Object.keys(errors.username.types).join(' - ')}</p>}

      <label htmlFor='password'>Пароль</label>
      <input
        className={classNames({ [cl.error]: passwordRequiredError })}
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
      {passwordRequiredError && (
        <p data-test-id='hint' className={cl.errorMessage}>
          Поле не может быть пустым
        </p>
      )}
      {errors.password && errors.password.types && <p>{Object.keys(errors.password.types).join(' - ')}</p>}

      <button type='submit'>следующий шаг</button>
    </form>
  );
};

const SecondStep: FC<NextStepProps> = ({ onNextStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SecondInputs>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<SecondInputs> = () => {
    onNextStep();
  };

  return (
    <form data-test-id='register-form' className={cl.form} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='firstName'>Имя</label>
      <input
        className={classNames({ [cl.error]: errors.firstName })}
        type='text'
        {...register('firstName', {
          required: true,
        })}
      />

      {errors.firstName && (
        <p data-test-id='hint' className={cl.errorMessage}>
          Поле не может быть пустым
        </p>
      )}

      <label htmlFor='password'>Фамилия</label>
      <input
        className={classNames({ [cl.error]: errors.lastName })}
        type='password'
        {...register('lastName', {
          required: true,
        })}
      />
      {errors.lastName && (
        <p data-test-id='hint' className={cl.errorMessage}>
          Поле не может быть пустым
        </p>
      )}

      <button type='submit'>последний шаг</button>
    </form>
  );
};

interface ThirdStepProps {
  onRegistration: () => void;
}

const ThirdStep: FC<ThirdStepProps> = ({ onRegistration }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ThirdInputs>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<ThirdInputs> = () => {
    onRegistration();
  };

  return (
    <form data-test-id='register-form' className={cl.form} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='phone'>Номер телефона</label>
      <input
        className={classNames({ [cl.error]: errors.phone })}
        type='text'
        {...register('phone', {
          required: true,
        })}
      />
      <p data-test-id='hint'>В формате +375 (xx) xxx-xx-xx</p>
      {errors.phone && (
        <p data-test-id='hint' className={cl.errorMessage}>
          Поле не может быть пустым
        </p>
      )}

      <label htmlFor='email'>E-mail</label>
      <input
        className={classNames({ [cl.error]: errors.email })}
        type='password'
        {...register('email', {
          required: true,
        })}
      />
      <p data-test-id='hint'>Введите корректный e-mail</p>
      {errors.email && (
        <p data-test-id='hint' className={cl.errorMessage}>
          Поле не может быть пустым
        </p>
      )}
      <button type='submit'>зарегистрироваться</button>
    </form>
  );
};

export const RegistrationPage = () => {
  const [step, setStep] = useState(1);
  // const [formState, setFormState] = useState<RegistrationRequest>({
  //   username: '',
  //   password: '',
  //   firstName: '',
  //   lastName: '',
  //   phone: '',
  //   email: '',
  // });

  // const [registration, { isLoading, isSuccess, isError, data, error }] = useRegistrationMutation();

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const registration1 = () => {};

  return (
    <div className={cl.registrationPage}>
      <h3>Регистрация</h3>
      <p>{step} шаг из 3</p>
      {step === 1 && <FirstStep onNextStep={nextStep} />}
      {step === 2 && <SecondStep onNextStep={nextStep} />}
      {step === 3 && <ThirdStep onRegistration={registration1} />}
      <p>
        Есть учётная запись? <a>войти</a>
      </p>
    </div>
  );
};

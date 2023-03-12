import { forwardRef, SyntheticEvent, useState } from 'react';
import { ChangeHandler } from 'react-hook-form';
import classNames from 'classnames';

import { ReactComponent as CheckmarkIcon } from '../../assets/icons/checkmark-icon.svg';
import { ReactComponent as EyeClosedIcon } from '../../assets/icons/eye-closed-icon.svg';
import { ReactComponent as EyeOpenedIcon } from '../../assets/icons/eye-opened-icon.svg';

import cl from './input.module.scss';

interface InputProps {
  label: string;
  value: string;
  type?: 'text' | 'password';
  isError?: boolean;
  validated?: boolean;
  name: string;
  onBlur: ChangeHandler;
  onChange: ChangeHandler;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, value, type = 'text', isError = false, validated = false, name, onBlur, onChange }, ref) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const inputType = type === 'password' && showPassword === false ? 'password' : 'text';

    const handleShowPassword = () => {
      setShowPassword(true);
    };

    const handleHidePassword = () => {
      setShowPassword(false);
    };

    const handleFocus = () => {
      setFocused(true);
    };

    const handleBlur = (e: SyntheticEvent) => {
      setFocused(false);
      onBlur(e);
    };

    return (
      <div
        className={classNames(cl.container, {
          [cl.active]: focused || value,
          [cl.error]: isError,
        })}
      >
        <p className={cl.label}>{label}</p>
        <input
          className={cl.input}
          ref={ref}
          type={inputType}
          name={name}
          onFocus={handleFocus}
          onChange={onChange}
          onBlur={handleBlur}
        />
        {type === 'password' && (
          <div className={cl.icons}>
            <CheckmarkIcon data-test-id='checkmark' className={classNames({ [cl.hidden]: !validated })} />
            {!showPassword && (focused || !!value) && (
              <EyeClosedIcon data-test-id='eye-closed' onClick={handleShowPassword} />
            )}
            {showPassword && (focused || !!value) && (
              <EyeOpenedIcon data-test-id='eye-opened' onClick={handleHidePassword} />
            )}
          </div>
        )}
      </div>
    );
  }
);

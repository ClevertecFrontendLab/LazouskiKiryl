import { User } from './user';

export interface AuthorizationRequest {
  identifier: string;
  password: string;
}

export interface RegistrationRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  password: string;
  passwordConfirmation: string;
  code: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface ForgotPasswordResponse {
  ok: boolean;
}

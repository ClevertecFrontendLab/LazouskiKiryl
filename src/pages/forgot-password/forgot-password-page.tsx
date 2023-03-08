import { useSearchParams } from 'react-router-dom';

export const ForgotPasswordPage = () => {
  const [searchParams] = useSearchParams();

  console.log(searchParams);

  return <div>ForgotPasswordPage</div>;
};

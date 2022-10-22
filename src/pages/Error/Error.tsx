import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error: any = useRouteError();

  return (
    <div id="error-page">
      <h1>Error</h1>
      <p>죄송합니다. 문제가 발생하였습니다.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;

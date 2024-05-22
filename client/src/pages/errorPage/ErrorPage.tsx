import { Typography } from '@mui/material';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <Typography
        variant="h3"
        fontSize="8rem"
        align="center"
        component="h1"
        marginTop="2rem"
        marginBlock="1rem"
      >
        Oops!
      </Typography>
      <Typography variant="h2" align="center" component="h2">
        Sorry, an error has occurred.
      </Typography>
      <Typography variant="h2" align="center" component="h3">
        Status: {isRouteErrorResponse(error) && error.status}
      </Typography>
      <Typography variant="h2" align="center" component="h4">
        {isRouteErrorResponse(error) && error.data}
      </Typography>
      <Typography variant="h2" align="center" component="p">
        Go back to <Link to="/">Home page</Link>
      </Typography>
    </>
  );
}

export default ErrorPage;

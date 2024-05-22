import { CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import UsersList from '../../components/usersList/UsersList';
import { User } from '../../interfaces/User';

function HomePage() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<User[]> => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/users`,
      );
      return data.users;
    },
  });

  if (isLoading) {
    return (
      <Typography variant="h1" align="center" marginTop="1.5rem">
        Loading... <CircularProgress size={90} />
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h1" align="center" marginTop="1.5rem" color="error">
        {error.message}, try again later
      </Typography>
    );
  }

  return <UsersList users={users} />;
}

export default HomePage;

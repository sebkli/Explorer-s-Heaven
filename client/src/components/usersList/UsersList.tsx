import { Box, List, Typography } from '@mui/material';
import UserItem from '../userItem/UserItem';
import { UsersListProps } from './UsersListProps';

function UsersList({ users }: UsersListProps) {
  if (!users?.length) {
    return (
      <Typography variant="h1" align="center" marginTop="1.5rem">
        No users found.
      </Typography>
    );
  }

  return (
    <Box display="flex" justifyContent="center" marginTop="1.5rem">
      <List>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </List>
    </Box>
  );
}

export default UsersList;

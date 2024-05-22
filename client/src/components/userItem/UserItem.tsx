import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './UserItem.module.css';
import { UserItemProps } from './UserItemProps';

function UserItem({ user }: UserItemProps) {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt="User avatar"
            src={user.image}
            sx={{ width: '4rem', height: '4rem', marginRight: '1.75rem' }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant="h4">{user.name}</Typography>}
          secondary={
            <Typography variant="h5" align="right">
              <ListItemButton>
                {user.postsNumber > 0 ? (
                  <Link to={`/${user.id}/posts`} className={styles.link}>
                    {user.postsNumber}&nbsp;
                    {user.postsNumber === 1 ? 'Post' : 'Posts'}
                  </Link>
                ) : (
                  '0 Posts'
                )}
              </ListItemButton>
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="fullWidth" orientation="horizontal" color="primary" />
    </>
  );
}

export default UserItem;

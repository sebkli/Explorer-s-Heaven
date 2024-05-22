import AddLocationIcon from '@mui/icons-material/AddLocation';
import { Avatar, Typography } from '@mui/material';
import PostForm from '../../components/forms/postForm/PostForm';

function PostFormPage() {
  return (
    <>
      <Avatar
        sx={{
          marginX: 'auto',
          marginTop: '1.5rem',
          bgcolor: 'info',
          width: '56px',
          height: '56px',
        }}
      >
        <AddLocationIcon sx={{ width: '54px', height: '54px' }} />
      </Avatar>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        marginBottom="1.5rem"
      >
        Add new post
      </Typography>
      <PostForm />
    </>
  );
}

export default PostFormPage;

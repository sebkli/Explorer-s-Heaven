import EditLocationIcon from '@mui/icons-material/EditLocation';
import { Avatar, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PostForm from '../../components/forms/postForm/PostForm';
import { Post } from '../../interfaces/Post';

function UpdatePostPage() {
  const { postId } = useParams();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: async (): Promise<Post> => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/${postId}`,
      );
      return response.data.post;
    },
  });

  if (isLoading) {
    return (
      <Typography variant="h1" align="center" marginTop="1.5rem">
        Loading... <CircularProgress size={90} />
      </Typography>
    );
  }

  if (post === undefined || error) {
    return (
      <Typography variant="h1" align="center" marginTop="1.5rem">
        {error ? error.message : 'Something went wrong'} try again later{' '}
      </Typography>
    );
  }

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
        <EditLocationIcon sx={{ width: '54px', height: '54px' }} />
      </Avatar>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        marginBottom="1.5rem"
      >
        Edit post {post.title}
      </Typography>
      <PostForm post={post} />
    </>
  );
}

export default UpdatePostPage;

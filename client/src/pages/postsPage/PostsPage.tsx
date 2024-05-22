import { CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PostsList from '../../components/postsList/PostsList';
import { Post } from '../../interfaces/Post';

function PostsPage() {
  const { userId } = useParams();

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts', userId],
    queryFn: async (): Promise<Post[]> => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/user/${userId}`,
      );
      return data.posts;
    },
  });

  if (isLoading) {
    return (
      <Typography variant="h1" align="center" marginTop="1.5rem">
        Loading... <CircularProgress size={90} />
      </Typography>
    );
  }

  if (posts === undefined || error) {
    return (
      <Typography variant="h1" align="center" marginTop="1.5rem" color="error">
        {error ? error.message : 'Something went wrong'} try again later{' '}
      </Typography>
    );
  }

  return <PostsList posts={posts} />;
}

export default PostsPage;

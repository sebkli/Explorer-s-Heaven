import { Grid, Typography } from '@mui/material';
import PostItem from '../postItem/PostItem';
import { PostsListProps } from './PostsListProps';

function PostsList({ posts }: PostsListProps) {
  if (!posts?.length) {
    return (
      <Typography variant="h1" align="center" marginTop="1.5rem">
        This user have no posts
      </Typography>
    );
  }

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
      marginTop={0}
    >
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </Grid>
  );
}

export default PostsList;

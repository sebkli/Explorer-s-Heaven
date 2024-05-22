import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  Grid,
  Typography,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Alert from '../alert/Alert';
import PlaceMap from '../placeMap/PlaceMap';
import { PostItemProps } from './PostItemProps';

function PostItem({ post }: PostItemProps) {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isError, setIsError] = useState<undefined | Error>(undefined);

  const { loggedUser } = useAuth();

  const handleMapOpen = () => setIsMapOpen(true);
  const handleMapClose = () => setIsMapOpen(false);
  const handleOpenAlert = () => setIsDeleteAlertOpen(true);
  const handleCloseAlert = () => setIsDeleteAlertOpen(false);
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${loggedUser?.token}`,
        },
      });
      handleCloseAlert();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsError(error.request.data || { message: 'Something went wrong' });
      }
    }
  };

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardMedia
            sx={{ height: '13rem', objectFit: 'scale-down' }}
            image={post.image}
            title={post.title}
          />
          <CardContent>
            <Typography
              variant="h4"
              component="h1"
              textAlign="center"
              color="text.secondary"
              whiteSpace="nowrap"
            >
              {post.title}
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              textAlign="center"
              color="text.secondary"
              gutterBottom
            >
              {post.address}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              color="text.secondary"
              overflow="auto"
              sx={{ height: '5rem' }}
            >
              {post.description}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant="outlined"
              endIcon={<LocationOnIcon />}
              size="small"
              onClick={handleMapOpen}
            >
              Show map
            </Button>
            {post.userID === loggedUser?.id && (
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
                size="small"
              >
                <Link to={`/post/${post.id}`}>
                  <Button endIcon={<EditIcon />}>Edit</Button>
                </Link>
                <Button endIcon={<DeleteIcon />} onClick={handleOpenAlert}>
                  Delete
                </Button>
              </ButtonGroup>
            )}
          </CardActions>
        </Card>
      </Grid>
      <Dialog open={isMapOpen} onClose={handleMapClose} maxWidth="lg">
        <PlaceMap post={post} handleMapClose={handleMapClose} />
      </Dialog>
      <Dialog open={isDeleteAlertOpen} onClose={handleOpenAlert} maxWidth="lg">
        <Alert
          title="Delete post"
          content="Are you sure you want to delete this post?"
          handleCloseAlert={handleCloseAlert}
          handleAccept={() => {
            mutateAsync(post.id);
          }}
        />
        {isError && (
          <Typography
            variant="h5"
            component="p"
            color="error"
            textAlign="center"
          >
            Something went wrong, try again
          </Typography>
        )}
      </Dialog>
    </>
  );
}

export default PostItem;

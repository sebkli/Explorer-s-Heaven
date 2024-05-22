import { zodResolver } from '@hookform/resolvers/zod';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import DoneIcon from '@mui/icons-material/Done';
import PlaceIcon from '@mui/icons-material/Place';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TitleIcon from '@mui/icons-material/Title';
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  IconButton,
  Input,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import useShowUploadedFiles from '../../../hooks/useShowUploadedFiles';
import { PostFormFields, postFormSchema } from './PostFormFields';
import { PostFormProps } from './PostFormProps';

function PostForm({ post }: PostFormProps) {
  const { loggedUser } = useAuth();
  const navigate = useNavigate();
  const form = useForm<PostFormFields>({
    defaultValues: {
      title: post?.title,
      address: post?.address,
      description: post?.description,
    },
    mode: 'onTouched',
    resolver: zodResolver(postFormSchema),
  });

  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = form;

  const showFiles = useShowUploadedFiles(watch('image'));

  const createPost = async (data: PostFormFields) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/posts/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${loggedUser?.token}`,
        },
      });
      navigate(`/${loggedUser?.id}/posts`, { relative: 'path' });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError('root', error.response?.data);
      }
    }
  };

  const updatePost = async (data: PostFormFields) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/posts/${post?.id}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${loggedUser?.token}`,
          },
        },
      );
      navigate(`/${loggedUser?.id}/posts`, { relative: 'path' });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError('root', error.response?.data);
      }
    }
  };

  const onSubmit: SubmitHandler<PostFormFields> = async (data) => {
    const formData = { ...data, userID: loggedUser?.id, image: data.image[0] };

    try {
      if (!post) {
        await createPost(formData);
      } else {
        await updatePost(formData);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          'root',
          error.response?.data || {
            type: 'manual',
            message: 'Network error',
          },
        );
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Stack
        spacing={2}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="Title"
          color="info"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <TitleIcon />
              </InputAdornment>
            ),
          }}
          {...register('title', { required: 'Title field is required' })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          label="Address"
          color="info"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PlaceIcon />
              </InputAdornment>
            ),
          }}
          {...register('address', { required: 'Address field is required' })}
          error={!!errors.address}
          helperText={errors.address?.message}
        />
        <TextField
          label="Description"
          color="info"
          required
          multiline
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
          {...register('description', {
            required: 'Description field is required',
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <Stack spacing={1}>
          <Button
            component="label"
            variant="contained"
            endIcon={<CloudUploadIcon />}
            sx={{ width: '11rem' }}
          >
            <Input
              type="file"
              sx={{
                display: 'none',
              }}
              {...register('image')}
            />
            Upload image
          </Button>
          {showFiles() && (
            <Container
              sx={{
                display: 'flex',
                paddingTop: '0.8rem',
                border: '1px dotted white',
              }}
            >
              {showFiles()}
              <IconButton
                onClick={() => resetField('image')}
                sx={{ bottom: '13px' }}
              >
                <DeleteIcon fontSize="large" color="info" />
              </IconButton>
            </Container>
          )}
          <ButtonGroup
            sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
          >
            <Button
              variant="contained"
              endIcon={<CloseIcon />}
              color="error"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              endIcon={<RestartAltIcon />}
              color="info"
              type="reset"
            >
              Reset
            </Button>
            <Button
              variant="contained"
              endIcon={<DoneIcon />}
              color="success"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              OK
            </Button>
          </ButtonGroup>
          {isSubmitting && (
            <Typography variant="h5" textAlign="center">
              Submitting...&nbsp;
              <CircularProgress size={30} color="info" />
            </Typography>
          )}
          {errors.root && (
            <Typography
              variant="h5"
              component="p"
              color="error"
              textAlign="center"
            >
              {errors.root.message}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}

export default PostForm;

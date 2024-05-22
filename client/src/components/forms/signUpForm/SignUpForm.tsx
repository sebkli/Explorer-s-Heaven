import { zodResolver } from '@hookform/resolvers/zod';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import PasswordIcon from '@mui/icons-material/Password';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useShowUploadedFiles from '../../../hooks/useShowUploadedFiles';
import { SignUpFormFields, signUpFormSchema } from './SignUpFormFields';

function SignUpForm() {
  const navigate = useNavigate();
  const form = useForm<SignUpFormFields>({
    mode: 'onTouched',
    resolver: zodResolver(signUpFormSchema),
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
    reset,
    setError,
    watch,
  } = form;

  const showFiles = useShowUploadedFiles(watch('image'));

  const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
    const formData = { ...data, image: data.image[0] };

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/users/signup`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      setIsSubmitted(true);
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

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <Container maxWidth="sm">
      <Avatar
        sx={{
          marginX: 'auto',
          marginTop: '1.5rem',
          bgcolor: 'info',
          width: '56px',
          height: '56px',
        }}
      >
        <PersonAddIcon sx={{ width: '54px', height: '54px' }} />
      </Avatar>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        marginBottom="1.5rem"
      >
        Sign in
      </Typography>
      <Stack
        spacing={2}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <TextField
          label="User Name"
          type="name"
          color="info"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Email"
          type="email"
          color="info"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AlternateEmailIcon />
              </InputAdornment>
            ),
          }}
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          color="info"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PasswordIcon />
              </InputAdornment>
            ),
          }}
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label="Repeat Password"
          type="password"
          color="info"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PasswordIcon />
              </InputAdornment>
            ),
          }}
          {...register('repeatPassword')}
          error={!!errors.repeatPassword}
          helperText={errors.repeatPassword?.message}
        />
        <Stack spacing={1}>
          <Button
            component="label"
            variant="contained"
            endIcon={<CloudUploadIcon />}
            sx={{ width: '12rem' }}
          >
            <TextField
              type="file"
              inputProps={{ accept: '.png, .jpg, .jpeg' }}
              sx={{
                display: 'none',
              }}
              {...register('image')}
            />
            Upload avatar
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
          {isSubmitted && (
            <Box
              sx={{
                paddingTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" textAlign="center" color="#4caf50">
                Success&nbsp;
              </Typography>
              <CheckCircleIcon color="success" />
              <Typography variant="h5" textAlign="center">
                &nbsp;You can now
              </Typography>
              <Button
                variant="contained"
                sx={{ marginLeft: '1rem' }}
                onClick={() => navigate('/login', { relative: 'path' })}
              >
                Log in
              </Button>
            </Box>
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

export default SignUpForm;

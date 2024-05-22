import { zodResolver } from '@hookform/resolvers/zod';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import PasswordIcon from '@mui/icons-material/Password';
import {
  Avatar,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import styles from './LogInForm.module.css';
import { LoginFormFields, logInFormSchema } from './LogInFormFields';

function LogInForm() {
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const form = useForm<LoginFormFields>({
    mode: 'onTouched',
    resolver: zodResolver(logInFormSchema),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        data,
      );
      logIn(response.data.user);
      navigate('/', { relative: 'path' });
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
        <AccountCircle sx={{ width: '54px', height: '54px' }} />
      </Avatar>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        marginBottom="1.5rem"
      >
        Log in
      </Typography>
      <Stack
        spacing={2}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          {...register('email', { required: 'Email field is required' })}
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
          {...register('password', { required: 'Password field is required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
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
        <Typography variant="h6" component="p">
          Don&rsquo;t have an account? &nbsp;
          <Link to="/register" className={styles.link}>
            Sign up here
          </Link>
        </Typography>
      </Stack>
    </Container>
  );
}

export default LogInForm;

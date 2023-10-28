import Avatar from '@mui/material/Avatar';
import Button from '../../components/common/button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputField from '../../components/common/input_field';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useLoginMutation } from '../../redux/auth/authService';
import { useAppDispatch } from '../../hooks/store';
import { showToast } from '../../redux/toast/toastSlice';
import { useNavigate } from 'react-router-dom';
import { ToastType } from '../../constants/toast';
import './styles.scss';

type FormValues = {
  email: string;
  password: string;
};
// Yup schema
const schema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { control, handleSubmit } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    try {
      await login(formData).unwrap();
      dispatch(
        showToast({
          type: ToastType.SUCCESS,
          message: 'Logged in successfully',
        })
      );
      navigate('/');
    } catch (error: any) {
      let message = '';
      if (error.data && error.data.message) {
        message = error.data.message;
      } else {
        message = error.message;
      }

      dispatch(
        showToast({
          type: ToastType.ERROR,
          message,
        })
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box className="container">
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="form"
        >
          <InputField
            control={control}
            margin="normal"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <InputField
            control={control}
            margin="normal"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button
            className="login_btn"
            type="submit"
            fullWidth
            variant="contained"
            text="Login"
            loading={isLoading}
            loadingLabel="Logging in..."
            onClick={handleSubmit(onSubmit)}
          />
          <Grid container>
            <Grid item>
              <Link href="signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

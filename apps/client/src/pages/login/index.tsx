import * as React from 'react';
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

import './styles.scss';

type FormValues = {
  email: string;
  password: string;
};
// Yup schema
const schema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(8),
});

export default function Login() {
  const { control, handleSubmit } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    console.log('🚀 ~ file: index.tsx:21 ~ onSubmit ~ formData:', formData);
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
            type="submit"
            fullWidth
            variant="contained"
            text="Login"
            onClick={handleSubmit(onSubmit)}
            className="login_btn"
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

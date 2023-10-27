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
  name: string;
  email: string;
  password: string;
  budgetLimit: number;
};
// Yup schema
const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8),
  budgetLimit: Yup.number()
    .required('Budget Limit is required')
    .min(0, 'Budget Limit must not be negative'),
});

export default function SignUp() {
  const { control, handleSubmit } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: { name: '', email: '', password: '', budgetLimit: 0 },
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
          Sign up
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
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <InputField
            control={control}
            margin="normal"
            name="email"
            label="Email Address"
            type="email"
            autoComplete="email"
          />
          <InputField
            control={control}
            margin="normal"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <InputField
            control={control}
            margin="normal"
            name="budgetLimit"
            label="Budget Limit"
            type="number"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            text="Sign up"
            onClick={handleSubmit(onSubmit)}
            className="signup_button"
          />
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {'Already have an account? Login'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

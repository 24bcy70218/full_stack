import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Paper, Typography, Alert, CircularProgress, Box } from '@mui/material';

const fakeAuth = (email, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      email === 'admin@test.com' && password === 'password123'
        ? resolve({ user: email })
        : reject(new Error('Invalid credentials'));
    }, 1500);
  });

function LoginForm() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setStatus(null);
    try {
      await fakeAuth(data.email, data.password);
      setStatus({ type: 'success', msg: 'Login successful!' });
    } catch (err) {
      setStatus({ type: 'error', msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5">Login</Typography>

      {status && (
        <Alert severity={status.type}>{status.msg}</Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth label="Email" margin="normal"
          {...register('email', { required: 'Email required' })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          fullWidth type="password" label="Password" margin="normal"
          {...register('password', { required: 'Password required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button type="submit" fullWidth variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={20} /> : 'Login'}
        </Button>
      </Box>
    </Paper>
  );
}

export default LoginForm;

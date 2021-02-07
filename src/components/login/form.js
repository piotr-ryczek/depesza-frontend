import React from 'react';
import { useFormik } from 'formik';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useFormStyles } from './styles';

export const LoginForm = props => {
  const { onSubmit } = props;

  const classes = useFormStyles();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      code: '',
    },
    onSubmit,
  });

  const { handleSubmit, handleBlur, handleChange, values } = formik;

  const { email, password, code } = values;

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            value={email}
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Hasło"
            name="password"
            value={password}
            variant="outlined"
            type="password"
            onBlur={handleBlur}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>W przypadku pierwszego logowania pomiń.</Typography>
          <TextField
            label="Token 2FA z Google Authenticator"
            name="code"
            value={code}
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit" color="primary" size="large">
            Zaloguj się
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

import React from 'react';

import { useFormik } from 'formik';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useFormStyles } from './styles';

export const SetPasswordForm = props => {
  const { onSubmit } = props;

  const classes = useFormStyles();
  const formik = useFormik({
    initialValues: {
      password: '',
      repeatPassword: '',
    },
    onSubmit,
  });

  const { handleSubmit, handleBlur, handleChange, values } = formik;

  const { password, repeatPassword } = values;

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>Do czasy zmiany hasła jesteś zalogowany na kilka minut.</Typography>
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
          <TextField
            label="Powtórz hasło"
            name="repeatPassword"
            value={repeatPassword}
            variant="outlined"
            type="password"
            onBlur={handleBlur}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit" color="primary" size="large">
            Ustaw hasło
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

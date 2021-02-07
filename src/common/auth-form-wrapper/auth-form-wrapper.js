import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { useStyles } from './styles';

export const AuthFormWrapper = props => {
  const { children } = props;

  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.box}>
      <Grid item xs={6}>
        <Paper elevation={3} className={classes.paper}>
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
};

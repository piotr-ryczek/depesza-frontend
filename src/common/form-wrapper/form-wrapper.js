import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { useStyles } from './styles';

export const FormWrapper = props => {
  const { children } = props;

  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.box}>
      <Grid item xs={10}>
        <Paper elevation={3} className={classes.paper}>
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
};

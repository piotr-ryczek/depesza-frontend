import React from 'react';

import Grid from '@material-ui/core/Grid';
import MaterialUIPagination from '@material-ui/lab/Pagination';

import { useStyles } from './styles';

export const Pagination = props => {
  const { count, page, onChange } = props;

  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.wrapper}>
      <Grid item>
        <MaterialUIPagination count={count} page={page} onChange={onChange} />
      </Grid>
    </Grid>
  );
};

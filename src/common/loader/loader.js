import React from 'react';
import clsx from 'clsx';

import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './styles';

export const Loader = props => {
  const { isLoading, children } = props;

  const classes = useStyles();

  return (
    <div className={clsx(classes.loaderWrapper, { [classes.loaderWrapperActive]: isLoading })}>
      <div className={classes.childrenWrapper}>{children}</div>

      {isLoading && (
        <div className={classes.loadingIconWrapper}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

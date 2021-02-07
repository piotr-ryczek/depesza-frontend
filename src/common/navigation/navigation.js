import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import routes from 'lib/routes';
import { logout } from 'redux/actions';

import { useStyles } from './styles';

export const Navigation = () => {
  const { token, hasPassword } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!token || !hasPassword) {
    return null;
  }

  return (
    <AppBar position="static">
      <Toolbar className={classes.menuWrapper}>
        <div className={classes.onLeft}>
          <Button color="inherit" component={Link} to={routes.account} disabled>
            Twoje konto
          </Button>
          <Button color="inherit" component={Link} to={routes.articles.index}>
            Artykuły
          </Button>
          <Button color="inherit" component={Link} to={routes.articles.new}>
            Dodaj artykuł
          </Button>
          <Button color="inherit" component={Link} to={routes.reports} disabled>
            Zgłoszenia
          </Button>
        </div>
        <div className={classes.onRight}>
          <Button color="inherit" onClick={handleLogout}>
            Wyloguj się
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

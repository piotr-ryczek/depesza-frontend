import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import QRCode from 'qrcode.react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { useSecurity } from 'lib/hooks';
import { AuthFormWrapper } from 'common/auth-form-wrapper';
import { logout, handleApiError } from 'redux/actions';
import { Loader } from 'common/loader';
import api from 'lib/api';
import basicReducer from 'lib/basic-reducer';

import { SetPasswordForm } from './form';
import { useStyles } from './styles';

export const SetPassword = () => {
  useSecurity(true, false);
  const dispatch = useDispatch();
  const [{ isLoading, isAfterProcess, secret2FA, email }, setState] = useReducer(basicReducer, {
    isLoading: false,
    isAfterProcess: false,
    secret2FA: '',
    email: '',
  });
  const classes = useStyles();

  const handleSubmit = async values => {
    try {
      setState({
        isLoading: true,
      });
      const { password, repeatPassword } = values;

      const { data } = await api.setPassword({ password, repeatPassword });

      const { secret2FA, email } = data;

      setState({
        isLoading: false,
        isAfterProcess: true,
        secret2FA,
        email,
      });
    } catch (error) {
      dispatch(handleApiError(error));
      setState({
        isLoading: false,
      });
    }
  };

  const handleLogout = async () => {
    dispatch(logout());
  };

  return (
    <AuthFormWrapper>
      <Loader isLoading={isLoading}>
        {isAfterProcess ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>
                Zeskanuj ten kod do Google Authenticator (lud innej obsługującej TOTP). Następnie wyloguj się i ponownie
                zaloguj już z wykorzystaniem 6-cyfrowego tokenu z aplikacji.
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.qrWrapper}>
              <QRCode value={`otpauth://totp/Agregator:${email}?secret=${secret2FA}`} size={256} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="button" color="primary" size="large" onClick={handleLogout}>
                Wyloguj się
              </Button>
            </Grid>
          </Grid>
        ) : (
          <SetPasswordForm onSubmit={handleSubmit} />
        )}
      </Loader>
    </AuthFormWrapper>
  );
};

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useSecurity } from 'lib/hooks';
import { AuthFormWrapper } from 'common/auth-form-wrapper';
import { login, handleApiError } from 'redux/actions';
import { Loader } from 'common/loader';
import api from 'lib/api';

import { LoginForm } from './form';

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useSecurity(false);

  const handleSubmit = async values => {
    try {
      setIsLoading(true);
      const { email, password, code } = values;

      const { data } = await api.login({ email, password, code });

      const { token, hasPassword } = data;
      dispatch(login(token, hasPassword));
      setIsLoading(false);
    } catch (error) {
      dispatch(handleApiError(error));
      setIsLoading(false);
    }
  };

  return (
    <AuthFormWrapper>
      <Loader isLoading={isLoading}>
        <LoginForm onSubmit={handleSubmit} />
      </Loader>
    </AuthFormWrapper>
  );
};

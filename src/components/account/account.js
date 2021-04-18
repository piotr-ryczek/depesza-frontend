import React, { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';

import { FormWrapper } from 'common/form-wrapper';
import { useSecurity } from 'lib/hooks';
import api from 'lib/api';
import { addNotification, handleApiError } from 'redux/actions';
import basicReducer from 'lib/basic-reducer';
import { Loader } from 'common/loader';

import { PublisherForm } from './form';

export const Account = () => {
  useSecurity(true);

  const dispatch = useDispatch();
  const [{ publisher, isLoading }, setState] = useReducer(basicReducer, {
    publisher: null,
    isLoading: false,
  });

  const fetchPublisher = async () => {
    try {
      setState({
        isLoading: true,
      });

      const { data } = await api.getOwnPublisher();

      const { publisher } = data;

      setState({
        publisher,
        isLoading: false,
      });
    } catch (error) {
      dispatch(handleApiError(error));
      setState({
        isLoading: false,
      });
    }
  };

  const handleSave = async values => {
    try {
      setState({
        isLoading: true,
      });

      const { name, description, authors, patroniteUrl, facebookUrl, twitterUrl, www, newLogo } = values;

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('authors', authors);
      formData.append('patroniteUrl', patroniteUrl);
      formData.append('facebookUrl', facebookUrl);
      formData.append('twitterUrl', twitterUrl);
      formData.append('www', www);

      if (newLogo) {
        formData.append('file', newLogo);
      }

      await api.updateOwnPublisher(formData);
      fetchPublisher();

      dispatch(
        addNotification({
          type: 'success',
          message: 'Dane wydawcy zostały zapisane',
        }),
      );
      setState({
        isLoading: false,
      });
    } catch (error) {
      dispatch(handleApiError(error));
      setState({
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    fetchPublisher();
  }, []);

  return (
    <Loader isLoading={isLoading}>
      <FormWrapper>
        <PublisherForm publisher={publisher} onSubmit={handleSave} />
      </FormWrapper>
    </Loader>
  );
};

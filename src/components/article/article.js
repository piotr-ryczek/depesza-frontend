import React, { useEffect, useReducer } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { FormWrapper } from 'common/form-wrapper';
import { useSecurity } from 'lib/hooks';
import api from 'lib/api';
import { addNotification, handleApiError } from 'redux/actions';
import basicReducer from 'lib/basic-reducer';
import { Loader } from 'common/loader';
import routes from 'lib/routes';

import { ArticleForm } from './form';

export const Article = props => {
  useSecurity(true);

  const { isEdit } = props;
  const { articleId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [{ article, isLoading, regions }, setState] = useReducer(basicReducer, {
    article: null,
    isLoading: false,
    regions: [],
  });

  const fetchArticle = async () => {
    try {
      setState({
        isLoading: true,
      });

      const { data } = await api.getArticle(articleId);

      const { article } = data;

      setState({
        article,
        isLoading: false,
      });
    } catch (error) {
      dispatch(handleApiError(error));
      setState({
        isLoading: false,
      });
    }
  };

  const fetchRegions = async () => {
    try {
      setState({
        isLoading: true,
      });

      const { data } = await api.getRegions();

      const { regions } = data;
      setState({
        regions,
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

      const { title, author, excerpt, content, newPhoto, regionId, isPublished } = values;

      const formData = new FormData();
      formData.append('isPublished', isPublished);
      formData.append('title', title);
      formData.append('author', author);
      formData.append('excerpt', excerpt);
      formData.append('content', content);
      formData.append('regionId', regionId);

      if (newPhoto) {
        formData.append('file', newPhoto);
      }

      if (isEdit) {
        await api.updateArticle(articleId, formData);
        fetchArticle();
      } else {
        const { data } = await api.createArticle(formData);
        const {
          article: { _id: newArticleId },
        } = data;
        history.push(routes.articles.edit.replace(':articleId', newArticleId));
      }

      setState({
        isLoading: false,
      });
      dispatch(
        addNotification({
          type: 'success',
          message: 'Artykuł został zapisany',
        }),
      );
    } catch (error) {
      dispatch(handleApiError(error));
      setState({
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    fetchRegions();

    if (isEdit) {
      fetchArticle();
    }
  }, []);

  return (
    <Loader isLoading={isLoading}>
      <FormWrapper>
        <ArticleForm regions={regions} isEdit={isEdit} article={article} onSubmit={handleSave} />
      </FormWrapper>
    </Loader>
  );
};

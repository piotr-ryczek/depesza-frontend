import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import MaterialTable from '@material-table/core';

import basicReducer from 'lib/basic-reducer';
import { Loader } from 'common/loader';
import { Pagination } from 'common/pagination';
import routes from 'lib/routes';
import config from 'lib/config';
import { addNotification, handleApiError } from 'redux/actions';

import api from 'lib/api';
import icons from 'lib/tables/icons';
import options from 'lib/tables/options';

import columns from './table/columns';
import getActions from './table/get-actions';

export const Articles = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [{ articles, page, perPage, pages, isLoading }, setState] = useReducer(basicReducer, {
    articles: [],
    page: 1,
    perPage: config.perPage,
    pages: 1,
    isLoading: false,
  });

  const fetchArticles = async () => {
    try {
      setState({
        isLoading: true,
      });

      const { data } = await api.getArticles({
        page,
        perPage,
      });

      const { articles, countAll } = data;

      setState({
        articles,
        pages: Math.ceil(countAll / perPage),
        isLoading: false,
      });
    } catch (error) {
      dispatch(handleApiError(error));
      setState({
        isLoading: false,
      });
    }
  };

  const handleChangePagination = (event, newPage) => {
    setState({
      page: newPage,
    });
  };

  const handleEdit = articleId => {
    history.push(routes.articles.edit.replace(':articleId', articleId));
  };

  const handleRemove = async articleId => {
    const confirmation = confirm('Na pewno chcesz usunąć?');

    if (confirmation) {
      setState({
        isLoading: true,
      });

      await api.deleteArticle(articleId);

      setState({
        isLoading: false,
      });
      dispatch(
        addNotification({
          type: 'success',
          message: 'Artykuł został usunięty',
        }),
      );
      fetchArticles();
    }
  };

  const actions = getActions({
    handleEdit,
    handleRemove,
  });

  useEffect(() => {
    fetchArticles();
  }, [page]);

  return (
    <Loader isLoading={isLoading}>
      <MaterialTable
        columns={columns}
        data={articles}
        icons={icons}
        actions={actions}
        options={options}
        title="Artykuły"
      />
      {pages > 1 && <Pagination count={pages} page={page} onChange={handleChangePagination} />}
    </Loader>
  );
};

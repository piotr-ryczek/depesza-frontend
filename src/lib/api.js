import axios from 'axios';
import qs from 'qs';

import config from 'lib/config';
import { store } from 'redux/store';

class Api {
  constructor() {
    this.apiUrl = config.apiUrl;
  }

  getConfig = (data = null, dataType = 'query') => {
    const jwtToken = store.getState().auth.token;

    const config = {};

    if (jwtToken) {
      Object.assign(config, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    }

    if (data) {
      if (dataType === 'query') {
        Object.assign(config, {
          paramsSerializer: params => qs.stringify(params),
          params: data,
        });
      } else {
        Object.assign(config, {
          data,
        });
      }
    }

    return config;
  };

  post = (url, body) => axios.post(`${this.apiUrl}${url}`, body, this.getConfig());

  put = (url, body) => axios.put(`${this.apiUrl}${url}`, body, this.getConfig());

  patch = (url, body) => axios.patch(`${this.apiUrl}${url}`, body, this.getConfig());

  delete = (url, body) => axios.delete(`${this.apiUrl}${url}`, this.getConfig(body, 'body'));

  get = (url, query = {}) => axios.get(`${this.apiUrl}${url}`, this.getConfig(query, 'query'));

  login = async values => {
    const { email, password, code } = values;

    const payload = {
      email,
      password,
    };

    if (code) {
      Object.assign(payload, {
        code,
      });
    }

    return this.post('/publishers/login', payload);
  };

  setPassword = async values => {
    const { password, repeatPassword } = values;

    return this.post('/publishers/setPassword', {
      password,
      repeatPassword,
    });
  };

  getArticles = async values => {
    const { page, perPage } = values;

    return this.get('/publishers/articles', {
      page,
      perPage,
    });
  };

  deleteArticle = async articleId => {
    return this.delete(`/publishers/articles/${articleId}`);
  };

  getArticle = async articleId => {
    return this.get(`/articles/${articleId}`);
  };

  getRegions = async () => {
    return this.get(`/regions`);
  };

  createArticle = async formDataValues => {
    const { headers } = this.getConfig();

    Object.assign(headers, {
      'Content-Type': 'multipart/form-data',
    });

    return axios({
      method: 'post',
      url: `${this.apiUrl}/publishers/articles`,
      data: formDataValues,
      headers,
    });
  };

  updateArticle = async (articleId, formDataValues) => {
    const { headers } = this.getConfig();

    Object.assign(headers, {
      'Content-Type': 'multipart/form-data',
    });

    return axios({
      method: 'put',
      url: `${this.apiUrl}/publishers/articles/${articleId}`,
      data: formDataValues,
      headers,
    });
  };
}

export default new Api();

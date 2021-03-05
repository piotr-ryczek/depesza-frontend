import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import routes from 'lib/routes';

export const useSecurity = (isSecured = true, neededPasswordToBeSettedUp = true) => {
  const history = useHistory();
  const token = useSelector(state => state.auth.token);
  const hasPassword = useSelector(state => state.auth.hasPassword);

  if (isSecured && !token) {
    // Route Secured and lack of token => Login
    history.push(routes.login);

    return false;
  } else if (isSecured && token && !hasPassword && neededPasswordToBeSettedUp) {
    // Route secure, there is token, but user hasn't setted up password and route needs it => Set Password
    history.push(routes.setPassword);

    return false;
  } else if (isSecured && token && hasPassword && !neededPasswordToBeSettedUp) {
    history.push(routes.articles.index);

    return false;
  } else if (!isSecured && token) {
    // Route isn't secured and user has token => Dashboard
    history.push(routes.articles.index);

    return false;
  }

  return {
    token,
    hasPassword,
  };
};

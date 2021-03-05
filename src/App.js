import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from 'redux/store';
import { Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import routes from 'lib/routes';

import { RouteSecured } from './lib/hoc/route-secured';
import { Notifications } from './common/notifications';
import { Navigation } from './common/navigation';

import { Article } from './components/article';
import { Articles } from './components/articles';
import { Login } from './components/login';
import { Reports } from './components/reports';
import { SetPassword } from './components/set-password';
import { Account } from './components/account';

const history = createBrowserHistory();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <Navigation />
          <Switch>
            <RouteSecured exact path={routes.login} component={Login} isSecured={false} />
            <RouteSecured
              exact
              path={routes.setPassword}
              component={SetPassword}
              isSecured={true}
              neededPasswordToBeSettedUp={false}
            />
            <RouteSecured exact path={[routes.main, routes.articles.index]} component={Articles} isSecured={true} />
            <RouteSecured
              exact
              path={routes.articles.new}
              component={props => <Article {...props} isEdit={false} isSecured={true} />}
            />
            <RouteSecured
              exact
              path={routes.articles.edit}
              component={props => <Article {...props} isEdit={true} isSecured={true} />}
            />
            <RouteSecured exact path={routes.reports} component={Reports} isSecured={true} />
            <RouteSecured exact path={routes.account} component={Account} isSecured={true} />
          </Switch>
        </Router>
        <Notifications />
      </PersistGate>
    </Provider>
  );
};

export default App;

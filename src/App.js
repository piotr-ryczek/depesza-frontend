import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from 'redux/store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import routes from 'lib/routes';

import { Notifications } from './common/notifications';
import { Navigation } from './common/navigation';

import { Article } from './components/article';
import { Articles } from './components/articles';
import { Login } from './components/login';
import { Reports } from './components/reports';
import { SetPassword } from './components/set-password';

const history = createBrowserHistory();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <Navigation />
          <Switch>
            <Route exact path={routes.login} component={Login} />
            <Route exact path={routes.setPassword} component={SetPassword} />
            <Route exact path={[routes.main, routes.articles.index]} component={Articles} />
            <Route exact path={routes.articles.new} component={props => <Article {...props} isEdit={false} />} />
            <Route exact path={routes.articles.edit} component={props => <Article {...props} isEdit={true} />} />
            <Route exact path={routes.reports} component={Reports} />
          </Switch>
        </Router>
        <Notifications />
      </PersistGate>
    </Provider>
  );
};

export default App;

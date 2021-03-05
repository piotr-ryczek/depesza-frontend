import React from 'react';
import { Route } from 'react-router-dom';

import { useSecurity } from 'lib/hooks';

export const RouteSecured = props => {
  const { isSecured = true, neededPasswordToBeSettedUp = true, ...rest } = props;

  const result = useSecurity(isSecured, neededPasswordToBeSettedUp);

  if (!result) {
    return null;
  }

  return <Route {...rest} />;
};

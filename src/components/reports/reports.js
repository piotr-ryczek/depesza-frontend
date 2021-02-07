import React from 'react';

import { useSecurity } from 'lib/hooks';

export const Reports = () => {
  useSecurity(true);

  return <p>Reports</p>;
};

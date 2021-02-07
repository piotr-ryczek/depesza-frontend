import React, { forwardRef } from 'react';

import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export default {
  Search: forwardRef((props, ref) => <SearchIcon {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <KeyboardArrowUpIcon {...props} ref={ref} />),
};

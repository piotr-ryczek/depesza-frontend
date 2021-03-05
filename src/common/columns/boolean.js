import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

export const Boolean = ({ value }) => (value ? <CheckIcon /> : <ClearIcon />);

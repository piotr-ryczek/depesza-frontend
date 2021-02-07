import React from 'react';

import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

const getActions = ({ handleRemove, handleEdit }) => [
  {
    icon: () => <DeleteRoundedIcon />,
    onClick: (_, { _id }) => handleRemove(_id),
  },
  {
    icon: () => <EditRoundedIcon />,
    onClick: (_, { _id }) => handleEdit(_id),
  },
];

export default getActions;

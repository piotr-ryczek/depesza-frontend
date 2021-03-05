import React from 'react';
import { Boolean } from 'common/columns';

const columns = [
  {
    title: 'Tytuł',
    field: 'title',
  },
  {
    title: 'Region',
    field: 'region.title',
  },
  {
    title: 'Data utworzenia',
    field: 'createdAt',
  },
  {
    title: 'Opublikowany?',
    render: ({ isPublished }) => <Boolean value={isPublished} />,
  },
];

export default columns;

import config from 'lib/config';

export const getImageUrl = url => `${config.apiUrl}/uploads/w768/${url}`;

import config from 'lib/config';

export const getImageUrl = url => `${config.apiUrl}/images/${url}?fileSize=768`;

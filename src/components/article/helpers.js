import { stateToHTML } from 'draft-js-export-html';

export const getInitialValues = (isEdit, article) => {
  const initialValues = {
    title: '',
    excerpt: '',
    content: '',
    currentPhotoUrl: null,
    newPhoto: null,
    regionId: '',
  };

  if (!isEdit || !article) {
    return initialValues;
  }

  const {
    title,
    excerpt,
    content,
    photoUrl,
    region: { _id: regionId },
  } = article;

  Object.assign(initialValues, {
    title,
    excerpt,
    content,
    currentPhotoUrl: photoUrl,
    regionId,
  });

  return initialValues;
};

export const transformValues = values => {
  const { title, excerpt, content, regionId, newPhoto } = values;

  const transformedValues = {
    title,
    regionId,
    excerpt: typeof excerpt === 'string' ? excerpt : stateToHTML(excerpt.getCurrentContent()),
    content: typeof content === 'string' ? content : stateToHTML(content.getCurrentContent()),
  };

  if (newPhoto) {
    Object.assign(transformedValues, {
      newPhoto,
    });
  }

  return transformedValues;
};

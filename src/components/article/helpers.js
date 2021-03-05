import { stateToHTML } from 'draft-js-export-html';

export const getInitialValues = (isEdit, article) => {
  const initialValues = {
    title: '',
    author: '',
    excerpt: '',
    content: '',
    currentPhotoUrl: null,
    newPhoto: null,
    regionId: '',
    isPublished: false,
  };

  if (!isEdit || !article) {
    return initialValues;
  }

  const {
    title,
    author,
    excerpt,
    content,
    photoUrl,
    region: { _id: regionId },
    isPublished,
  } = article;

  Object.assign(initialValues, {
    title,
    author,
    excerpt,
    content,
    currentPhotoUrl: photoUrl,
    regionId,
    isPublished,
  });

  return initialValues;
};

export const transformValues = values => {
  const { title, author, excerpt, content, regionId, newPhoto, isPublished } = values;

  const transformedValues = {
    isPublished,
    title,
    author,
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

export const getInitialValues = publisher => {
  const initialValues = {
    name: '',
    description: '',
    authors: '',
    patroniteUrl: '',
    facebookUrl: '',
    twitterUrl: '',
    www: '',
    currentLogoUrl: null,
    newLogo: null,
  };

  if (!publisher) {
    return initialValues;
  }

  const {
    name = '',
    description = '',
    authors = [],
    patroniteUrl = '',
    facebookUrl = '',
    twitterUrl = '',
    www = '',
    logoUrl = '',
  } = publisher;

  Object.assign(initialValues, {
    name,
    description,
    authors: authors.join(','),
    patroniteUrl,
    facebookUrl,
    twitterUrl,
    www,
    currentLogoUrl: logoUrl,
  });

  return initialValues;
};

export const transformValues = values => {
  const { newLogo, ...rest } = values;

  const transformedValues = {
    ...rest,
  };

  if (newLogo) {
    Object.assign(transformedValues, {
      newLogo,
    });
  }

  return transformedValues;
};

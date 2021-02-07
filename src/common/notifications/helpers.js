const translations = {
  INCORRECT_PASSWORD: 'Niepoprawne hasło',
  INCORRECT_EMAIL: 'Niepoprawny email',
  PUBLISHER_ALREADY_HAS_PASSWORD: 'Wydawca już posiada hasło',
  INCORRECT_2FA_CODE: 'Niepoprawny kod 2FA',
  PUBLISHER_DOES_NOT_EXIST: 'Nie istnieje wydawca o tym emailu',
  ARTICLE_HAS_NOT_BEEN_UPDATED: 'Artykuł nie został zaktualizowany',
  ARTICLE_HAS_NOT_BEEN_DELETED: 'Artykuł nie został usunięty',
  FILE_UPLOAD_ERROR: 'Błąd przy uploadzie pliku',
  FILE_RESIZE_ERROR: 'Błąd przy przekształcaniu obrazka',
  PUBLISHER_HAS_NOT_BEEN_UPDATED: 'Wydawca nie został zaktualizowany',
};

export const translateCode = (code, message?) => {
  if (!code) return message;

  if (translations[code]) {
    return translations[code];
  }

  return `${code} (brak tłumaczenia)`;
};

export const getSeverity = type => {
  switch (type) {
    case 'error':
      return 'error';
    case 'success':
      return 'success';
    case 'warning':
      return 'warning';
    default:
      return 'info';
  }
};

export function generateAuthError(message) {
  switch (message) {
    case 'INVALID_PASSWORD':
      return 'Password is incorrect';
    case 'EMAIL_EXISTS':
      return 'User already exists';
    default:
      return 'Something wrong';
  }
};

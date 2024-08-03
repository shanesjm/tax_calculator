type ApiError = {
  code: string;
  field: string;
  message: string;
};

type CustomError = Error & {
  status?: number;
  data?: ApiError;
};

export const handleApiError = (error: CustomError | undefined) => {
  if (!error) {
    return 'An unknown error occurred';
  }

  if (error.status === 400) {
    // Bad Request
    return error.data?.message || 'Bad request';
  } else if (error.status === 500) {
    // Internal Server Error
    return error.data?.message || 'Internal server error';
  } else if (error.message === 'Network Error') {
    // Network Error
    return 'Network error. Please check your connection.';
  } else {
    // Other errors
    return error.message || 'An error occurred';
  }
};

export default handleApiError;

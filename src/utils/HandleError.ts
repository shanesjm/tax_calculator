type ApiError = {
  code: string;
  field: string;
  message: string;
};

type Error = Error & {
  status?: string;
  error?: string;
};

type CustomError = {
  code: string;
  field: string;
  message: string;
};

type CustomErrorResponseType = {
  data: {
    error: CustomError[];
  };
};

export const handleApiError = (error: Error | CustomErrorResponseType) => {
  let errorMessage = 'Something went wrong';
  if (typeof error === 'object' && 'status' in error) {
    if (error.status === 500) {
      errorMessage =
        error?.data?.errors?.[0]?.message || 'Internal server error';
    }
    if (error.status === 400) {
      errorMessage = error?.data?.errors?.[0]?.message || 'Bad request';
    }
    if (error.status === 'FETCH_ERROR') {
      errorMessage = 'Network error. Please check your internet connection.';
    }
    if (error.status === 'TIMEOUT_ERROR') {
      errorMessage = 'The request timed out. Please try again later.';
    }
  }
  console.error({
    timeStamp: new Date(),
    status: error.status || 500,
    message: errorMessage,
  });
};

export default handleApiError;

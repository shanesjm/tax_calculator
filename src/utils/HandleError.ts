import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import {
  ErrorType,
  CustomErrorResponseType,
} from '../common_types/CommonTypes';

const handleApiError = (
  error:
    | FetchBaseQueryError
    | SerializedError
    | undefined
    | CustomErrorResponseType
) => {
  // Transform the error message and log it
  let errorMessage = 'Something went wrong';
  let logMessage = '';
  let code: string | number = '';

  const customErrorResponseType = error as CustomErrorResponseType;

  if (customErrorResponseType.data?.errors?.length) {
    logMessage = customErrorResponseType.data.errors[0].message;
    code = customErrorResponseType.data.errors[0].code;
  } else {
    const comonErrorType = error as ErrorType;
    code = comonErrorType.status;
    logMessage = comonErrorType.error;

    if (comonErrorType.status === 'TIMEOUT_ERROR') {
      errorMessage = 'The request timed out. Please try again later.';
    }
  }
  // Ideally we should use libraries like Sentry for logging
  // eslint-disable-next-line no-console
  console.error({
    timeStamp: new Date(),
    code,
    message: logMessage,
  });
  return errorMessage;
};

export default handleApiError;

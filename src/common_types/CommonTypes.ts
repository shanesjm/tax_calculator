export type ResponsiveImageProps = {
  src: string;
  alt: string;
  maxWidth?: string | number;
};

type CustomError = {
  code: string;
  field: string;
  message: string;
};

export type CustomErrorResponseType = {
  status: number;
  data: {
    errors: CustomError[];
  };
};

export type ErrorType = {
  status: string | number;
  error: string;
};

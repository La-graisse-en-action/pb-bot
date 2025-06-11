export type ApiResponse<T> = {
  data: T;
  status: 'success' | 'error';
  message?: string;
  error?: string;
  hasError?: boolean;
};

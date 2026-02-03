import axios from 'axios';

/**
 * Extracts a user-friendly error message from an Axios error response.
 *
 * The server returns errors in the format:
 * { isSuccess: false, code: number, message: string, result: null }
 *
 * This utility extracts the `message` field so it can be displayed to users
 * via toast notifications or inline error states.
 */
export const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    return error.response.data.message;
  }
  return '알 수 없는 오류가 발생했습니다.';
};

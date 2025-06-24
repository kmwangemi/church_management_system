import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Type definitions for better type safety
interface FastAPIValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

interface APIErrorResponse {
  detail?: FastAPIValidationError[] | string;
  message?: string;
  error?: string;
}

interface APIError {
  response?: {
    data?: APIErrorResponse;
    status?: number;
    statusText?: string;
  };
  message?: string;
  name?: string;
}

export const getError = (err: APIError | any): string => {
  try {
    const responseData = err?.response?.data;
    // Handle FastAPI validation errors (array of validation errors)
    if (Array.isArray(responseData?.detail)) {
      return responseData.detail
        .map((e: FastAPIValidationError) => {
          // Better field name extraction with fallbacks
          const field = e.loc?.[1] || e.loc?.[0] || 'field';
          const message = e.msg || 'Invalid value';
          return `${field}: ${message}`;
        })
        .join(', ');
    }
    // Handle FastAPI string detail errors
    if (typeof responseData?.detail === 'string') {
      return responseData.detail;
    }
    // Handle custom API errors with message field
    if (responseData?.message) {
      return responseData.message;
    }
    // Handle custom API errors with error field
    if (responseData?.error) {
      return responseData.error;
    }
    // Handle HTTP status errors with meaningful messages
    if (err?.response?.status) {
      const status = err.response.status;
      const statusText = err.response.statusText || 'Error';
      switch (status) {
        case 400:
          return 'Bad request. Please check your input.';
        case 401:
          return 'Unauthorized. Please log in again.';
        case 403:
          return "Access denied. You don't have permission.";
        case 404:
          return 'Resource not found.';
        case 422:
          return 'Validation error. Please check your input.';
        case 429:
          return 'Too many requests. Please try again later.';
        case 500:
          return 'Internal server error. Please try again.';
        case 502:
          return 'Bad gateway. Service temporarily unavailable.';
        case 503:
          return 'Service unavailable. Please try again later.';
        default:
          return `${status}: ${statusText}`;
      }
    }
    // Fallback to standard error message
    if (err?.message) {
      return err.message;
    }
    // Final fallback
    return 'An unexpected error occurred. Please try again.';
  } catch (parseError) {
    // If error parsing fails, return a safe fallback
    console.error('Error parsing error object:', parseError);
    return 'An unexpected error occurred. Please try again.';
  }
};

export const capitalizeFirstLetter = (str: string) => {
  if (typeof str !== 'string' || str.length === 0) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.substring(1);
};

export const getFirstLetter = (str: string) => {
  if (typeof str !== 'string' || str.length === 0) return '';
  return str.charAt(0).toLocaleUpperCase();
};

export function capitalizeFirstLetterOfEachWord(str: string) {
  if (typeof str !== 'string' || str.length === 0) return '';
  const words = str.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] =
      words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }
  return words.join(' ');
}

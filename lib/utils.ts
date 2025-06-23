import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getError = (err: any) => {
  try {
    const responseData = err?.response?.data;
    // Handle FastAPI validation errors
    if (Array.isArray(responseData?.detail)) {
      return responseData.detail
        .map((e: any) => {
          const field = e.loc?.[1] || 'field';
          return `${field}: ${e.msg}`;
        })
        .join(', ');
    }
    // Handle custom API errors like: { message: "Invalid email or password", ... }
    if (responseData?.message) {
      return responseData.message;
    }
    // Fallback to standard JS error message
    return err?.message || 'An unknown error occurred';
  } catch {
    return 'An unknown error occurred';
  }
};

import { ref } from 'vue';
import axios, { AxiosError } from 'axios';

export const globalError = ref<string | null>(null);
export const isGlobalErrorVisible = ref(false);

export function handleError(error: unknown): void {
  let errorMessage = 'An unexpected error occurred. Please try again later.';

  // Handle Axios errors
  if (axios.isAxiosError(error)) {
    const axiosError: AxiosError = error as AxiosError;

    if (axiosError.response) {
      const status: number = axiosError.response.status;

      if (status === 401 || status === 403) {
        errorMessage = 'Authentication error. Please log in again.';
      } else if (status === 404) {
        errorMessage = 'The requested resource was not found.';
      } else if (status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      } else {
        errorMessage = (axiosError.response.data as { message?: string })?.message || errorMessage;
      }
    } else if (axiosError.request) {
      // Request was made but no response received
      errorMessage = 'Network error. Please check your connection.';
    }
  } else if (error instanceof Error) {
    // Handle standard JavaScript errors
    errorMessage = error.message || errorMessage;
  }

  globalError.value = errorMessage;
  isGlobalErrorVisible.value = true;
}

export function clearError(): void {
  globalError.value = null;
  isGlobalErrorVisible.value = false;
}

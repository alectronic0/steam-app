// API configuration for different environments
const getApiUrl = (): string => {
  // In Docker, use service name; in development, use localhost
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    // If running on localhost:3000, API is on localhost:8080
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:8080';
    }

    // In Docker, use service name
    return 'http://steam-api:8080';
  }

  // Fallback for server-side rendering
  return 'http://steam-api:8080';
};

export const API_BASE_URL = getApiUrl();

export const API_ENDPOINTS = {
  compare: (userId1: string, userId2: string) =>
    `${API_BASE_URL}/user?user_id_1=${userId1}&user_id_2=${userId2}`,
  health: `${API_BASE_URL}/health`,
};

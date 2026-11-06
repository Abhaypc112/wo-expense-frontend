import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { ApiError, AuthResponse } from '../types';
import { loadSession, saveSession } from './session';

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:5107';

export const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const session = loadSession();
  if (session) config.headers.Authorization = `Bearer ${session.accessToken}`;
  return config;
});

// One in-flight refresh shared by all concurrent 401s.
let refreshing: Promise<AuthResponse> | null = null;

function refresh(refreshToken: string) {
  refreshing ??= axios
    .post<AuthResponse>(`${baseURL}/api/auth/refresh`, { refreshToken })
    .then((r) => {
      saveSession(r.data);
      return r.data;
    })
    .finally(() => {
      refreshing = null;
    });
  return refreshing;
}

api.interceptors.response.use(
  (r) => r,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retried?: boolean })
      | undefined;
    const session = loadSession();
    const isAuthCall = original?.url?.startsWith('/api/auth/') && original.url !== '/api/auth/me';

    if (error.response?.status === 401 && original && session && !original._retried && !isAuthCall) {
      original._retried = true;
      try {
        const next = await refresh(session.refreshToken);
        original.headers.Authorization = `Bearer ${next.accessToken}`;
        return api(original);
      } catch {
        saveSession(null); // refresh failed: log out
      }
    }
    return Promise.reject(error);
  },
);

export function errorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiError>(error)) {
    return error.response?.data?.message ?? error.message;
  }
  return error instanceof Error ? error.message : 'Something went wrong';
}

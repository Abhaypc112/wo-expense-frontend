import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types';
import { useAuth } from './AuthContext';

export function useLogin() {
  const { signIn } = useAuth();
  return useMutation({
    mutationFn: (body: LoginRequest) =>
      api.post<AuthResponse>('/api/auth/login', body).then((r) => r.data),
    onSuccess: signIn,
  });
}

export function useRegister() {
  const { signIn } = useAuth();
  return useMutation({
    mutationFn: (body: RegisterRequest) =>
      api.post<AuthResponse>('/api/auth/register', body).then((r) => r.data),
    onSuccess: signIn,
  });
}

export function useGoogleLogin() {
  const { signIn } = useAuth();
  return useMutation({
    mutationFn: (idToken: string) =>
      api.post<AuthResponse>('/api/auth/google', { idToken }).then((r) => r.data),
    onSuccess: signIn,
  });
}

export function useMe() {
  const { session } = useAuth();
  return useQuery({
    queryKey: ['me', session?.userId],
    queryFn: () =>
      api
        .get<{ userId: string; fullName: string; email: string }>('/api/auth/me')
        .then((r) => r.data),
    enabled: !!session,
  });
}

import { createContext, useContext, useSyncExternalStore, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { SESSION_EVENT, loadSession, saveSession } from '../lib/session';
import type { AuthResponse } from '../types';

interface AuthContextValue {
  session: AuthResponse | null;
  signIn: (session: AuthResponse) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

let cached = loadSession();
const subscribe = (cb: () => void) => {
  const handler = () => {
    cached = loadSession();
    cb();
  };
  window.addEventListener(SESSION_EVENT, handler);
  return () => window.removeEventListener(SESSION_EVENT, handler);
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const session = useSyncExternalStore(subscribe, () => cached);

  const value: AuthContextValue = {
    session,
    signIn: (s) => {
      queryClient.clear();
      saveSession(s);
    },
    signOut: () => {
      saveSession(null);
      queryClient.clear();
    },
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

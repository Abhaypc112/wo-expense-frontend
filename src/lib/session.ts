import type { AuthResponse } from '../types';

const KEY = 'woexpense.session';
export const SESSION_EVENT = 'woexpense:session';

export function loadSession(): AuthResponse | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthResponse) : null;
  } catch {
    return null;
  }
}

export function saveSession(session: AuthResponse | null) {
  try {
    if (session) localStorage.setItem(KEY, JSON.stringify(session));
    else localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new Event(SESSION_EVENT));
}

import type { ReactNode } from 'react';

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="card">
      <h1>{title}</h1>
      {children}
    </main>
  );
}

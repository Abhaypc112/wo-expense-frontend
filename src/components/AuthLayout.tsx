import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { GoogleButton } from '../auth/GoogleButton';
import { Card } from './Card';
import { Divider } from './Divider';

interface AuthLayoutProps {
  title: string;
  /** The form itself. */
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
}

/** Shared shell for login / register: card, form slot, Google sign-in, switch link. */
export function AuthLayout({
  title,
  children,
  footerText,
  footerLinkText,
  footerLinkTo,
}: AuthLayoutProps) {
  return (
    <Card title={title}>
      {children}
      <Divider />
      <GoogleButton />
      <p>
        {footerText} <Link to={footerLinkTo}>{footerLinkText}</Link>
      </p>
    </Card>
  );
}

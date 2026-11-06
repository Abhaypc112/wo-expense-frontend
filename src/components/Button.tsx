import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
}

export function Button({ loading, loadingText, children, disabled, ...rest }: ButtonProps) {
  return (
    <button disabled={disabled || loading} {...rest}>
      {loading ? (loadingText ?? 'Please wait…') : children}
    </button>
  );
}

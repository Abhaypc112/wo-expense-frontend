import type { InputHTMLAttributes, ReactNode } from 'react';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Rendered inside the input on the right (e.g. a toggle button). */
  endAdornment?: ReactNode;
}

export function TextField({ label, onChange, endAdornment, ...rest }: TextFieldProps) {
  return (
    <label className="field">
      <span>{label}</span>
      <div className="input-wrap">
        <input onChange={(e) => onChange(e.target.value)} {...rest} />
        {endAdornment}
      </div>
    </label>
  );
}

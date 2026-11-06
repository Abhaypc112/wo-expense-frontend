import { useState, type FormEvent } from 'react';
import { useRegister } from '../auth/hooks';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '../components/Button';
import { ErrorText } from '../components/ErrorText';
import { PasswordField } from '../components/PasswordField';
import { TextField } from '../components/TextField';
import { errorMessage } from '../lib/api';

export function RegisterPage() {
  const register = useRegister();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    register.mutate({ fullName, email, password });
  };

  return (
    <AuthLayout
      title="Create account"
      footerText="Already registered?"
      footerLinkText="Sign in"
      footerLinkTo="/login"
    >
      <form onSubmit={submit}>
        <TextField label="Full name" autoComplete="name" value={fullName} onChange={setFullName} required />
        <TextField label="Email" type="email" autoComplete="email" value={email} onChange={setEmail} required />
        <PasswordField label="Password" autoComplete="new-password" minLength={6} placeholder="Min 6 characters" value={password} onChange={setPassword} required />
        {register.isError && <ErrorText error={new Error(errorMessage(register.error))} />}
        <Button loading={register.isPending} loadingText="Creating…">Register</Button>
      </form>
    </AuthLayout>
  );
}

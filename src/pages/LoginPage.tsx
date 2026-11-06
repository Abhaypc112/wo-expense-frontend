import { useState, type FormEvent } from 'react';
import { useLogin } from '../auth/hooks';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '../components/Button';
import { ErrorText } from '../components/ErrorText';
import { PasswordField } from '../components/PasswordField';
import { TextField } from '../components/TextField';
import { errorMessage } from '../lib/api';

export function LoginPage() {
  const login = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    login.mutate({ email, password });
  };

  return (
    <AuthLayout
      title="Sign in"
      footerText="No account?"
      footerLinkText="Register"
      footerLinkTo="/register"
    >
      <form onSubmit={submit}>
        <TextField label="Email" type="email" autoComplete="email" value={email} onChange={setEmail} required />
        <PasswordField label="Password" autoComplete="current-password" value={password} onChange={setPassword} required />
        {login.isError && <ErrorText error={new Error(errorMessage(login.error))} />}
        <Button loading={login.isPending} loadingText="Signing in…">Sign in</Button>
      </form>
    </AuthLayout>
  );
}

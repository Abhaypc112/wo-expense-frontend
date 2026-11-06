import { useEffect, useRef, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { ErrorText } from '../components/ErrorText';
import { errorMessage } from '../lib/api';
import { useGoogleLogin } from './hooks';

const MAX_GOOGLE_WIDTH = 400; // Google's renderer rejects larger widths

export function GoogleButton() {
  const google = useGoogleLogin();
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();

  // Google renders the button in an iframe at a fixed pixel width,
  // so measure the container and re-render when it changes.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(Math.min(Math.floor(el.clientWidth), MAX_GOOGLE_WIDTH));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="google" ref={ref}>
      {width ? (
        <GoogleLogin
          key={width}
          width={width}
          size="large"
          theme="outline"
          text="continue_with"
          logo_alignment="center"
          onSuccess={(res) => res.credential && google.mutate(res.credential)}
          onError={() => console.error('Google sign-in failed')}
        />
      ) : null}
      {google.isError && <ErrorText error={new Error(errorMessage(google.error))} />}
    </div>
  );
}

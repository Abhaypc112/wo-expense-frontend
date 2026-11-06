import { useAuth } from '../auth/AuthContext';
import { useMe } from '../auth/hooks';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { DetailList } from '../components/DetailList';
import { ErrorText } from '../components/ErrorText';
import { errorMessage } from '../lib/api';

export function DashboardPage() {
  const { signOut } = useAuth();
  const me = useMe();

  return (
    <Card title="Dashboard">
      {me.isPending && <p className="muted">Loading your details…</p>}

      {me.isError && (
        <>
          <ErrorText error={new Error(errorMessage(me.error))} />
          <Button onClick={() => me.refetch()} loading={me.isFetching} loadingText="Retrying…">
            Retry
          </Button>
        </>
      )}

      {me.data && (
        <DetailList
          items={[
            { label: 'Name', value: me.data.fullName },
            { label: 'Email', value: me.data.email },
            { label: 'User ID', value: me.data.userId },
          ]}
        />
      )}

      <Button onClick={signOut} className="secondary">
        Sign out
      </Button>
    </Card>
  );
}
